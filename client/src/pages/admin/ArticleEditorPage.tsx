import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft, Save, Plus, Trash2, Eye, Upload, GripVertical,
  FileText, MapPin, Clock, Shield, Scale, BookOpen, MessageCircle, Heart, Info, FileUp, Loader2
} from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import { useState, useEffect, useCallback, useRef } from "react";

// ===== Type definitions =====
interface DecisionMatrix {
  title: string;
  optionA: { title: string; items: string[] };
  optionB: { title: string; items: string[]; subsidy?: string; cost?: string };
  reason: string;
}

interface Barriers {
  title: string;
  content: string;
  checklist: { title: string; description: string }[];
}

interface Regrets {
  title: string;
  content: string;
}

interface SupportSystemItem {
  name: string;
  description: string;
  link?: string;
  url?: string;
  rate?: string;
  limit?: string;
  point?: string;
}

interface BehindTheScenes {
  title: string;
  content: { heading: string; text: string }[];
}

interface Details {
  owner?: string;
  founded?: string;
  employees?: string;
  writer?: string;
  interviewDate?: string;
}

interface ChallengeCard {
  label: string;
  description: string;
  solutions: { title: string; detail: string }[];
  structuredBlock?: { label: string; items: string[] }[];
}

// ===== Helper: Annotation =====
function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 mt-1.5 px-2 py-1.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

// ===== Helper Components =====
function SectionHeader({ icon: Icon, title, description }: { icon: any; title: string; description?: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 bg-[#1D3A52]/10 rounded-lg">
        <Icon className="w-5 h-5 text-[#1D3A52]" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

function DynamicListField({
  items,
  onAdd,
  onRemove,
  onUpdate,
  renderItem,
  addLabel = "追加",
}: {
  items: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: any) => void;
  renderItem: (item: any, index: number, onChange: (val: any) => void) => React.ReactNode;
  addLabel?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="relative group">
          <div className="flex gap-2">
            <div className="flex-1">
              {renderItem(item, index, (val) => onUpdate(index, val))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-60 group-hover:opacity-100 transition-opacity self-start mt-1"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={onAdd} className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" />
        {addLabel}
      </Button>
    </div>
  );
}

// ===== Main Component =====
export default function ArticleEditorPage() {
  const { user, loading: authLoading } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const [matchNew] = useRoute("/admin/articles/new");
  const [matchEdit, editParams] = useRoute("/admin/articles/:id");
  const isNew = !!matchNew;
  const articleId = editParams?.id ? parseInt(editParams.id) : undefined;

  const utils = trpc.useUtils();

  // Fetch existing article for edit mode
  const { data: existingArticle, isLoading: articleLoading } = trpc.articles.getById.useQuery(
    { id: articleId! },
    { enabled: !!articleId }
  );

  // === Form State ===
  const [customId, setCustomId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [operator, setOperator] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocationField] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [editorComment, setEditorComment] = useState("");
  const [heroSummary, setHeroSummary] = useState("");
  const [isCaseStudy, setIsCaseStudy] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Timeline
  const [timelinePhase1, setTimelinePhase1] = useState("");
  const [timelinePhase2, setTimelinePhase2] = useState("");
  const [timelinePhase3, setTimelinePhase3] = useState("");
  const [timelinePhase4, setTimelinePhase4] = useState("");

  // Details
  const [details, setDetails] = useState<Details>({});

  // Regrets (支援がもたらした変化)
  const [regrets, setRegrets] = useState<Regrets | null>(null);

  // Decision Matrix (究極の二択)
  const [decisionMatrix, setDecisionMatrix] = useState<DecisionMatrix | null>(null);

  // Barriers (実務の壁)
  const [barriers, setBarriers] = useState<Barriers | null>(null);

  // Support System (活用した支援制度)
  const [supportSystems, setSupportSystems] = useState<SupportSystemItem[]>([]);

  // Behind the Scenes (再起の裏側)
  const [behindTheScenes, setBehindTheScenes] = useState<BehindTheScenes | null>(null);

  // Challenge Card
  const [challengeCard, setChallengeCard] = useState<ChallengeCard | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title || "");
      setCategory(existingArticle.category || "");
      setOperator(existingArticle.operator || "");
      setRole(existingArticle.role || "");
      setLocationField(existingArticle.location || "");
      setImage(existingArticle.image || "");
      setSummary(existingArticle.summary || "");
      setDescription(existingArticle.description || "");
      setEditorComment(existingArticle.editorComment || "");
      setHeroSummary(existingArticle.heroSummary || "");
      setIsCaseStudy(existingArticle.isCaseStudy || false);
      setSortOrder(existingArticle.sortOrder || 0);
      setTags((existingArticle.tags as string[]) || []);
      setTimelinePhase1(existingArticle.timelinePhase1 || "");
      setTimelinePhase2(existingArticle.timelinePhase2 || "");
      setTimelinePhase3(existingArticle.timelinePhase3 || "");
      setTimelinePhase4(existingArticle.timelinePhase4 || "");
      setDetails((existingArticle.details as Details) || {});
      setRegrets((existingArticle.regrets as Regrets) || null);
      setBarriers((existingArticle.barriers as Barriers) || null);
      setBehindTheScenes((existingArticle.behindTheScenes as BehindTheScenes) || null);
      setChallengeCard((existingArticle.challengeCard as ChallengeCard) || null);

      // Decision Matrix: migrate old pros/cons format to new items format
      const dm = existingArticle.decisionMatrix as any;
      if (dm) {
        setDecisionMatrix({
          title: dm.title || "",
          optionA: {
            title: dm.optionA?.title || "",
            items: dm.optionA?.items || dm.optionA?.pros || [""],
          },
          optionB: {
            title: dm.optionB?.title || "",
            items: dm.optionB?.items || dm.optionB?.pros || [""],
            subsidy: dm.optionB?.subsidy || "",
            cost: dm.optionB?.cost || "",
          },
          reason: dm.reason || "",
        });
      }

      // Support system can be single object or array
      const ss = existingArticle.supportSystem;
      if (Array.isArray(ss)) {
        setSupportSystems(ss as SupportSystemItem[]);
      } else if (ss && typeof ss === "object") {
        setSupportSystems([ss as SupportSystemItem]);
      } else {
        setSupportSystems([]);
      }
    }
  }, [existingArticle]);

  // Mutations
  const upsertMutation = trpc.articles.upsert.useMutation({
    onSuccess: (result) => {
      utils.articles.list.invalidate();
      utils.articles.getById.invalidate({ id: result.id });
      toast.success(isNew ? "記事を作成しました" : "記事を更新しました");
      setLocation("/admin");
    },
    onError: (error) => {
      toast.error(`保存に失敗しました: ${error.message}`);
    },
  });

  const uploadMutation = trpc.upload.image.useMutation({
    onError: (error) => {
      toast.error(`画像アップロードに失敗しました: ${error.message}`);
    },
  });

  const wordParseMutation = trpc.upload.parseWord.useMutation({
    onError: (error) => {
      toast.error(`Wordファイルの解析に失敗しました: ${error.message}`);
    },
  });

  // Word file upload handler
  const handleWordUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      toast.error(".docx形式のファイルを選択してください");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("ファイルサイズは10MB以下にしてください");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const result = await wordParseMutation.mutateAsync({
          base64,
          filename: file.name,
        });

        const f = result.fields;

        // Auto-fill form fields from parsed Word data
        if (f.title) setTitle(f.title);
        if (f.category) setCategory(f.category);
        if (f.operator) setOperator(f.operator);
        if (f.location) setLocationField(f.location);
        if (f.summary) setSummary(f.summary);
        if (f.description) setDescription(f.description);
        if (f.editorComment) setEditorComment(f.editorComment);
        if (f.tags && Array.isArray(f.tags)) setTags(f.tags);
        if (f.timelinePhase1) setTimelinePhase1(f.timelinePhase1);
        if (f.timelinePhase2) setTimelinePhase2(f.timelinePhase2);
        if (f.timelinePhase3) setTimelinePhase3(f.timelinePhase3);
        if (f.timelinePhase4) setTimelinePhase4(f.timelinePhase4);
        if (f.details) setDetails(f.details);
        if (f.regrets) setRegrets(f.regrets);
        if (f.barriers) setBarriers(f.barriers);
        if (f.behindTheScenes) setBehindTheScenes(f.behindTheScenes);
        if (f.challengeCard) setChallengeCard(f.challengeCard);

        // Decision Matrix
        if (f.decisionMatrix) {
          const dm = f.decisionMatrix;
          setDecisionMatrix({
            title: dm.title || "",
            optionA: {
              title: dm.optionA?.title || "",
              items: dm.optionA?.pros || dm.optionA?.items || [""],
            },
            optionB: {
              title: dm.optionB?.title || "",
              items: dm.optionB?.pros || dm.optionB?.items || [""],
              subsidy: dm.optionB?.subsidy || "",
              cost: dm.optionB?.cost || "",
            },
            reason: dm.reason || "",
          });
        }

        // Support System
        if (f.supportSystem) {
          if (Array.isArray(f.supportSystem)) {
            setSupportSystems(f.supportSystem);
          } else {
            setSupportSystems([f.supportSystem]);
          }
        }

        toast.success("Wordファイルの内容をフォームに反映しました。内容を確認して保存してください。");
      } catch (err) {
        // error handled by mutation onError
      }
    };
    reader.readAsDataURL(file);
    // Reset the input so the same file can be re-uploaded
    e.target.value = "";
  }, [wordParseMutation]);

  // Image upload handler
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("画像サイズは5MB以下にしてください");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const result = await uploadMutation.mutateAsync({
          base64,
          filename: file.name,
          contentType: file.type,
        });
        setImage(result.url);
        toast.success("画像をアップロードしました");
      } catch (err) {
        // error handled by mutation onError
      }
    };
    reader.readAsDataURL(file);
  }, [uploadMutation]);

  // Save handler
  const handleSave = () => {
    if (!title || !category || !location || !image || !summary) {
      toast.error("必須項目を入力してください（タイトル、カテゴリ、場所、画像、概要）");
      return;
    }

    // Convert decision matrix items back to pros format for DB compatibility
    let dmForSave: any = null;
    if (decisionMatrix) {
      dmForSave = {
        title: decisionMatrix.title,
        optionA: {
          title: decisionMatrix.optionA.title,
          pros: decisionMatrix.optionA.items.filter(Boolean),
        },
        optionB: {
          title: decisionMatrix.optionB.title,
          pros: decisionMatrix.optionB.items.filter(Boolean),
          subsidy: decisionMatrix.optionB.subsidy || undefined,
          cost: decisionMatrix.optionB.cost || undefined,
        },
        reason: decisionMatrix.reason,
      };
    }

    const articleData: any = {
      title,
      category,
      operator: operator || null,
      role: role || null,
      location,
      image,
      summary,
      description: description || null,
      editorComment: editorComment || null,
      heroSummary: heroSummary || null,
      isCaseStudy,
      sortOrder,
      tags: tags.length > 0 ? tags : null,
      timelinePhase1: timelinePhase1 || null,
      timelinePhase2: timelinePhase2 || null,
      timelinePhase3: timelinePhase3 || null,
      timelinePhase4: timelinePhase4 || null,
      details: Object.keys(details).length > 0 ? details : null,
      regrets: regrets || null,
      decisionMatrix: dmForSave,
      barriers: barriers || null,
      changes: null,
      behindTheScenes: behindTheScenes || null,
      challengeCard: challengeCard || null,
      supportSystem: supportSystems.length > 1 ? supportSystems : supportSystems.length === 1 ? supportSystems[0] : null,
    };

    if (articleId) {
      articleData.id = articleId;
    } else if (customId && !isNaN(parseInt(customId))) {
      articleData.id = parseInt(customId);
    }

    upsertMutation.mutate(articleData);
  };

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  if (authLoading || (articleId && articleLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-bold mb-4">管理者権限が必要です</p>
            <Button onClick={() => setLocation("/")}>トップページへ</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1D3A52] text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setLocation("/admin")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                一覧へ
              </Button>
              <div className="h-6 w-px bg-white/30" />
              <h1 className="text-lg font-bold">
                {isNew ? "新規記事作成" : `記事編集: ${existingArticle?.title || ""}`}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Wordファイルアップロード */}
              <label className="cursor-pointer">
                <input type="file" accept=".docx" className="hidden" onChange={handleWordUpload} />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  asChild
                  disabled={wordParseMutation.isPending}
                >
                  <span>
                    {wordParseMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />解析中...</>
                    ) : (
                      <><FileUp className="w-4 h-4 mr-2" />Word取り込み</>
                    )}
                  </span>
                </Button>
              </label>
              {articleId && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => window.open(`/industry/${articleId}`, "_blank")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  プレビュー
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={upsertMutation.isPending}
                className="bg-[#2D7F8F] hover:bg-[#236A7A]"
              >
                <Save className="w-4 h-4 mr-2" />
                {upsertMutation.isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* ===== 1. 基本情報 ===== */}
        <Card>
          <CardHeader>
            <SectionHeader icon={FileText} title="基本情報" description="記事のタイトル、カテゴリ、事業者情報" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Custom ID (new articles only) */}
              {isNew && (
                <div>
                  <Label htmlFor="customId" className="font-bold">記事ID</Label>
                  <Input
                    id="customId"
                    type="number"
                    value={customId}
                    onChange={(e) => setCustomId(e.target.value)}
                    placeholder="例: 105（空欄で自動採番）"
                    className="mt-1"
                  />
                  <Annotation>記事のURLに使われます（例: /industry/105）。空欄の場合は自動で採番されます。</Annotation>
                </div>
              )}
              {!isNew && (
                <div>
                  <Label className="font-bold">記事ID</Label>
                  <div className="mt-1 px-3 py-2 bg-gray-100 rounded text-gray-700 font-mono">
                    {articleId}
                  </div>
                  <Annotation>記事IDは変更できません。URL: /industry/{articleId}</Annotation>
                </div>
              )}
              <div>
                <Label htmlFor="sortOrder" className="font-bold">表示順</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="mt-1"
                />
                <Annotation>小さい数字ほど先頭に表示されます。一覧画面でドラッグ&ドロップでも変更可能です。</Annotation>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="title" className="font-bold">タイトル <span className="text-red-500">*</span></Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例: 震災を越えて、洗い続ける" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="category" className="font-bold">カテゴリ <span className="text-red-500">*</span></Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="例: クリーニング業" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="operator" className="font-bold">事業者名</Label>
                <Input id="operator" value={operator} onChange={(e) => setOperator(e.target.value)} placeholder="例: 本合クリーニング" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location" className="font-bold">所在地 <span className="text-red-500">*</span></Label>
                <Input id="location" value={location} onChange={(e) => setLocationField(e.target.value)} placeholder="例: 石川県鳳珠郡能登町" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="isCaseStudy" className="font-bold">活用事例として表示</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Switch checked={isCaseStudy} onCheckedChange={setIsCaseStudy} />
                  <span className="text-sm text-gray-600">{isCaseStudy ? "表示する" : "表示しない"}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="font-bold">タグ</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-red-100" onClick={() => removeTag(i)}>
                    #{tag} <Trash2 className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="タグを入力"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm" onClick={addTag}>追加</Button>
              </div>
            </div>

            {/* Image */}
            <div>
              <Label className="font-bold">メイン画像 <span className="text-red-500">*</span></Label>
              <div className="mt-2 space-y-3">
                {image && (
                  <div className="relative w-full max-w-md aspect-[3/2] rounded-lg overflow-hidden border bg-gray-100">
                    <img src={image} alt="プレビュー" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="画像URLを入力、またはファイルをアップロード" className="flex-1" />
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-1" />
                        {uploadMutation.isPending ? "..." : "アップロード"}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <Label htmlFor="summary" className="font-bold">概要 <span className="text-red-500">*</span></Label>
              <Textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="記事の概要" rows={3} className="mt-1" />
              <Annotation>TOPページの記事カードに表示されるテキストです。簡潔に記事の要点をまとめてください。</Annotation>
            </div>

            <div>
              <Label htmlFor="description" className="font-bold">事業説明（ヒーロー下部表示）</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="事業の詳細説明" rows={4} className="mt-1" />
              <Annotation>記事詳細ページのヒーロー画像下部に表示される事業説明文です。管理画面で入力した内容がそのまま反映されます。</Annotation>
            </div>
          </CardContent>
        </Card>

        {/* ===== 2. 取材情報 ===== */}
        <Card>
          <CardHeader>
            <SectionHeader icon={BookOpen} title="取材情報" description="取材日、ライター、代表者、創業年等" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">代表者名</Label>
                <Input value={details.owner || ""} onChange={(e) => setDetails({ ...details, owner: e.target.value })} placeholder="例: 本合太郎" className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">創業年</Label>
                <Input value={details.founded || ""} onChange={(e) => setDetails({ ...details, founded: e.target.value })} placeholder="例: 昭和初期" className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">従業員数</Label>
                <Input value={details.employees || ""} onChange={(e) => setDetails({ ...details, employees: e.target.value })} placeholder="例: 2名（家族経営）" className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">ライター</Label>
                <Input value={details.writer || ""} onChange={(e) => setDetails({ ...details, writer: e.target.value })} placeholder="例: 山田花子" className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">取材日</Label>
                <Input value={details.interviewDate || ""} onChange={(e) => setDetails({ ...details, interviewDate: e.target.value })} placeholder="例: 2025年3月" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== 3. 支援がもたらした変化（Regrets/Insight） ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader icon={Heart} title="支援がもたらした変化" description="記事冒頭のハイライトカード" />
              {!regrets ? (
                <Button variant="outline" size="sm" onClick={() => setRegrets({ title: "支援がもたらした変化", content: "" })}>
                  <Plus className="w-4 h-4 mr-2" />セクションを追加
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setRegrets(null)}>
                  <Trash2 className="w-4 h-4 mr-2" />削除
                </Button>
              )}
            </div>
          </CardHeader>
          {regrets && (
            <CardContent className="space-y-4">
              <div>
                <Label className="font-bold">本文</Label>
                <Textarea value={regrets.content} onChange={(e) => setRegrets({ ...regrets, content: e.target.value })} placeholder="支援によって起きた変化を記述" rows={4} className="mt-1" />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ===== 4. タイムライン（フェーズ1-4） ===== */}
        <Card>
          <CardHeader>
            <SectionHeader icon={Clock} title="タイムライン（フェーズ1-4）" description="課題→選択と決断→行動と変化→現在から未来へ" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="font-bold">フェーズ1: 課題</Label>
              <Textarea value={timelinePhase1} onChange={(e) => setTimelinePhase1(e.target.value)} placeholder="震災直後の課題、困難な状況を記述" rows={4} className="mt-1" />
            </div>
            <Separator />
            <div>
              <Label className="font-bold">フェーズ2: 選択と決断</Label>
              <Textarea value={timelinePhase2} onChange={(e) => setTimelinePhase2(e.target.value)} placeholder="どのような選択肢があり、何を決断したか" rows={4} className="mt-1" />
            </div>
            <Separator />
            <div>
              <Label className="font-bold">フェーズ3: 行動と変化</Label>
              <Textarea value={timelinePhase3} onChange={(e) => setTimelinePhase3(e.target.value)} placeholder="実際に取った行動と、それによる変化" rows={4} className="mt-1" />
            </div>
            <Separator />
            <div>
              <Label className="font-bold">フェーズ4: 現在から未来へ</Label>
              <Textarea value={timelinePhase4} onChange={(e) => setTimelinePhase4(e.target.value)} placeholder="現在の状況と今後の展望" rows={4} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* ===== 5. 究極の二択（Decision Matrix） ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader icon={Scale} title="究極の二択" description="事業者が直面した重要な選択肢の比較" />
              {!decisionMatrix ? (
                <Button variant="outline" size="sm" onClick={() => setDecisionMatrix({
                  title: "", optionA: { title: "", items: [""] },
                  optionB: { title: "", items: [""], subsidy: "", cost: "" }, reason: ""
                })}>
                  <Plus className="w-4 h-4 mr-2" />セクションを追加
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setDecisionMatrix(null)}>
                  <Trash2 className="w-4 h-4 mr-2" />削除
                </Button>
              )}
            </div>
          </CardHeader>
          {decisionMatrix && (
            <CardContent className="space-y-6">
              <div>
                <Label className="font-bold">タイトル</Label>
                <Input value={decisionMatrix.title} onChange={(e) => setDecisionMatrix({ ...decisionMatrix, title: e.target.value })} placeholder="例: 修理か買い替えか" className="mt-1" />
              </div>

              {/* Option A */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-700 mb-3">選択肢 A</h4>
                <div className="space-y-3">
                  <div>
                    <Label>タイトル</Label>
                    <Input value={decisionMatrix.optionA.title} onChange={(e) => setDecisionMatrix({
                      ...decisionMatrix, optionA: { ...decisionMatrix.optionA, title: e.target.value }
                    })} className="mt-1" />
                  </div>
                  <div>
                    <Label>項目（箇条書き）</Label>
                    <DynamicListField
                      items={decisionMatrix.optionA.items}
                      onAdd={() => setDecisionMatrix({
                        ...decisionMatrix, optionA: { ...decisionMatrix.optionA, items: [...decisionMatrix.optionA.items, ""] }
                      })}
                      onRemove={(i) => setDecisionMatrix({
                        ...decisionMatrix, optionA: { ...decisionMatrix.optionA, items: decisionMatrix.optionA.items.filter((_, idx) => idx !== i) }
                      })}
                      onUpdate={(i, val) => {
                        const newItems = [...decisionMatrix.optionA.items];
                        newItems[i] = val;
                        setDecisionMatrix({ ...decisionMatrix, optionA: { ...decisionMatrix.optionA, items: newItems } });
                      }}
                      renderItem={(item, index, onChange) => (
                        <Input value={item} onChange={(e) => onChange(e.target.value)} placeholder={`項目 ${index + 1}`} />
                      )}
                      addLabel="項目を追加"
                    />
                  </div>
                </div>
              </div>

              {/* Option B (Decision) */}
              <div className="bg-[#E6F3F5] p-4 rounded-lg border-2 border-[#2D7F8F]">
                <h4 className="font-bold text-[#1E3A5F] mb-3">決断（選択肢 B）</h4>
                <Annotation>
                  「補助金」「コスト」は任意入力です。未入力の場合、選択肢Aと同様に箇条書きのみで表示されます。
                </Annotation>
                <div className="space-y-3 mt-3">
                  <div>
                    <Label>タイトル</Label>
                    <Input value={decisionMatrix.optionB.title} onChange={(e) => setDecisionMatrix({
                      ...decisionMatrix, optionB: { ...decisionMatrix.optionB, title: e.target.value }
                    })} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>補助金 <span className="text-gray-400 text-xs">（任意）</span></Label>
                      <Input value={decisionMatrix.optionB.subsidy || ""} onChange={(e) => setDecisionMatrix({
                        ...decisionMatrix, optionB: { ...decisionMatrix.optionB, subsidy: e.target.value }
                      })} placeholder="例: 小規模事業者持続化補助金" className="mt-1" />
                    </div>
                    <div>
                      <Label>コスト <span className="text-gray-400 text-xs">（任意）</span></Label>
                      <Input value={decisionMatrix.optionB.cost || ""} onChange={(e) => setDecisionMatrix({
                        ...decisionMatrix, optionB: { ...decisionMatrix.optionB, cost: e.target.value }
                      })} placeholder="例: 自己負担 約5万円" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>項目（箇条書き）</Label>
                    <DynamicListField
                      items={decisionMatrix.optionB.items}
                      onAdd={() => setDecisionMatrix({
                        ...decisionMatrix, optionB: { ...decisionMatrix.optionB, items: [...decisionMatrix.optionB.items, ""] }
                      })}
                      onRemove={(i) => setDecisionMatrix({
                        ...decisionMatrix, optionB: { ...decisionMatrix.optionB, items: decisionMatrix.optionB.items.filter((_, idx) => idx !== i) }
                      })}
                      onUpdate={(i, val) => {
                        const newItems = [...decisionMatrix.optionB.items];
                        newItems[i] = val;
                        setDecisionMatrix({ ...decisionMatrix, optionB: { ...decisionMatrix.optionB, items: newItems } });
                      }}
                      renderItem={(item, index, onChange) => (
                        <Input value={item} onChange={(e) => onChange(e.target.value)} placeholder={`項目 ${index + 1}`} />
                      )}
                      addLabel="項目を追加"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold">決め手</Label>
                <Textarea value={decisionMatrix.reason} onChange={(e) => setDecisionMatrix({ ...decisionMatrix, reason: e.target.value })} placeholder="最終的な決め手となった理由" rows={3} className="mt-1" />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ===== 6. 実務の壁（Barriers） ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader icon={Shield} title="実務の壁" description="申請する人が直面しやすい課題" />
              {!barriers ? (
                <Button variant="outline" size="sm" onClick={() => setBarriers({ title: "実務の壁", content: "", checklist: [{ title: "", description: "" }] })}>
                  <Plus className="w-4 h-4 mr-2" />セクションを追加
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setBarriers(null)}>
                  <Trash2 className="w-4 h-4 mr-2" />削除
                </Button>
              )}
            </div>
          </CardHeader>
          {barriers && (
            <CardContent className="space-y-4">
              <div>
                <Label className="font-bold">チェックリスト</Label>
                <DynamicListField
                  items={barriers.checklist}
                  onAdd={() => setBarriers({ ...barriers, checklist: [...barriers.checklist, { title: "", description: "" }] })}
                  onRemove={(i) => setBarriers({ ...barriers, checklist: barriers.checklist.filter((_, idx) => idx !== i) })}
                  onUpdate={(i, val) => {
                    const newList = [...barriers.checklist];
                    newList[i] = val;
                    setBarriers({ ...barriers, checklist: newList });
                  }}
                  renderItem={(item, index, onChange) => (
                    <div className="bg-gray-50 p-3 rounded-lg border space-y-2">
                      <Input value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} placeholder={`壁のタイトル ${index + 1}`} />
                      <Textarea value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} placeholder="詳細説明" rows={2} />
                    </div>
                  )}
                  addLabel="壁を追加"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ===== 7. 活用した支援制度 ===== */}
        <Card>
          <CardHeader>
            <SectionHeader icon={Shield} title="活用した支援制度" description="利用した補助金・支援制度の情報" />
          </CardHeader>
          <CardContent>
            <DynamicListField
              items={supportSystems}
              onAdd={() => setSupportSystems([...supportSystems, { name: "", description: "", url: "", rate: "", limit: "", point: "" }])}
              onRemove={(i) => setSupportSystems(supportSystems.filter((_, idx) => idx !== i))}
              onUpdate={(i, val) => {
                const newSystems = [...supportSystems];
                newSystems[i] = val;
                setSupportSystems(newSystems);
              }}
              renderItem={(item, index, onChange) => (
                <div className="bg-gray-50 p-4 rounded-lg border space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">制度 {index + 1}</Badge>
                  </div>
                  <div>
                    <Label>制度名</Label>
                    <Input value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="例: 小規模事業者持続化補助金" className="mt-1" />
                  </div>
                  <div>
                    <Label>説明</Label>
                    <Textarea value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} placeholder="制度の概要" rows={2} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>補助率</Label>
                      <Input value={item.rate || ""} onChange={(e) => onChange({ ...item, rate: e.target.value })} placeholder="例: 2/3" className="mt-1" />
                    </div>
                    <div>
                      <Label>上限</Label>
                      <Input value={item.limit || ""} onChange={(e) => onChange({ ...item, limit: e.target.value })} placeholder="例: 200万円" className="mt-1" />
                    </div>
                    <div>
                      <Label>ポイント</Label>
                      <Input value={item.point || ""} onChange={(e) => onChange({ ...item, point: e.target.value })} placeholder="例: 審査が比較的通りやすい" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>詳細URL</Label>
                    <Input value={item.url || item.link || ""} onChange={(e) => onChange({ ...item, url: e.target.value })} placeholder="https://..." className="mt-1" />
                  </div>
                </div>
              )}
              addLabel="支援制度を追加"
            />
          </CardContent>
        </Card>

        {/* ===== 8. 再起の裏側（Behind the Scenes） ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader icon={MessageCircle} title="再起の裏側" description="店主の独白・インタビュー内容" />
              {!behindTheScenes ? (
                <Button variant="outline" size="sm" onClick={() => setBehindTheScenes({ title: "再起の裏側", content: [{ heading: "", text: "" }] })}>
                  <Plus className="w-4 h-4 mr-2" />セクションを追加
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setBehindTheScenes(null)}>
                  <Trash2 className="w-4 h-4 mr-2" />削除
                </Button>
              )}
            </div>
          </CardHeader>
          {behindTheScenes && (
            <CardContent className="space-y-4">
              <div>
                <Label className="font-bold">セクションタイトル</Label>
                <Input value={behindTheScenes.title} onChange={(e) => setBehindTheScenes({ ...behindTheScenes, title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">内容</Label>
                <DynamicListField
                  items={behindTheScenes.content}
                  onAdd={() => setBehindTheScenes({ ...behindTheScenes, content: [...behindTheScenes.content, { heading: "", text: "" }] })}
                  onRemove={(i) => setBehindTheScenes({ ...behindTheScenes, content: behindTheScenes.content.filter((_, idx) => idx !== i) })}
                  onUpdate={(i, val) => {
                    const newContent = [...behindTheScenes.content];
                    newContent[i] = val;
                    setBehindTheScenes({ ...behindTheScenes, content: newContent });
                  }}
                  renderItem={(item, index, onChange) => (
                    <div className="bg-gray-50 p-3 rounded-lg border space-y-2">
                      <Input value={item.heading} onChange={(e) => onChange({ ...item, heading: e.target.value })} placeholder={`見出し ${index + 1}`} />
                      <Textarea value={item.text} onChange={(e) => onChange({ ...item, text: e.target.value })} placeholder="本文" rows={4} />
                    </div>
                  )}
                  addLabel="段落を追加"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ===== 9. 課題カード（Challenge Card） ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader icon={FileText} title="課題カード" description="一覧ページに表示される課題ラベルと構造化ブロック" />
              {!challengeCard ? (
                <Button variant="outline" size="sm" onClick={() => setChallengeCard({ label: "", description: "", solutions: [], structuredBlock: [] })}>
                  <Plus className="w-4 h-4 mr-2" />セクションを追加
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setChallengeCard(null)}>
                  <Trash2 className="w-4 h-4 mr-2" />削除
                </Button>
              )}
            </div>
          </CardHeader>
          {challengeCard && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">ラベル</Label>
                  <Input value={challengeCard.label} onChange={(e) => setChallengeCard({ ...challengeCard, label: e.target.value })} placeholder="例: 設備復旧" className="mt-1" />
                </div>
                <div>
                  <Label className="font-bold">説明</Label>
                  <Input value={challengeCard.description} onChange={(e) => setChallengeCard({ ...challengeCard, description: e.target.value })} placeholder="課題の概要" className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="font-bold">構造化ブロック</Label>
                <DynamicListField
                  items={challengeCard.structuredBlock || []}
                  onAdd={() => setChallengeCard({ ...challengeCard, structuredBlock: [...(challengeCard.structuredBlock || []), { label: "", items: [""] }] })}
                  onRemove={(i) => setChallengeCard({ ...challengeCard, structuredBlock: (challengeCard.structuredBlock || []).filter((_, idx) => idx !== i) })}
                  onUpdate={(i, val) => {
                    const newBlocks = [...(challengeCard.structuredBlock || [])];
                    newBlocks[i] = val;
                    setChallengeCard({ ...challengeCard, structuredBlock: newBlocks });
                  }}
                  renderItem={(item, index, onChange) => (
                    <div className="bg-gray-50 p-3 rounded-lg border space-y-2">
                      <Input value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} placeholder={`ブロックラベル ${index + 1}`} />
                      <DynamicListField
                        items={item.items}
                        onAdd={() => onChange({ ...item, items: [...item.items, ""] })}
                        onRemove={(j) => onChange({ ...item, items: item.items.filter((_: any, idx: number) => idx !== j) })}
                        onUpdate={(j, val) => {
                          const newItems = [...item.items];
                          newItems[j] = val;
                          onChange({ ...item, items: newItems });
                        }}
                        renderItem={(subItem: string, subIndex: number, subOnChange: (val: string) => void) => (
                          <Input value={subItem} onChange={(e) => subOnChange(e.target.value)} placeholder={`項目 ${subIndex + 1}`} />
                        )}
                        addLabel="項目を追加"
                      />
                    </div>
                  )}
                  addLabel="ブロックを追加"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ===== 10. 編集後記 ===== */}
        <Card>
          <CardHeader>
            <SectionHeader icon={MessageCircle} title="編集後記" description="記事末尾のライターコメント" />
          </CardHeader>
          <CardContent>
            <Textarea value={editorComment} onChange={(e) => setEditorComment(e.target.value)} placeholder="編集後記のコメント" rows={4} />
          </CardContent>
        </Card>

        {/* ===== Save Button (Bottom) ===== */}
        <div className="flex justify-end gap-4 pb-12">
          <Button variant="outline" onClick={() => setLocation("/admin")}>
            キャンセル
          </Button>
          <Button
            onClick={handleSave}
            disabled={upsertMutation.isPending}
            className="bg-[#2D7F8F] hover:bg-[#236A7A] px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            {upsertMutation.isPending ? "保存中..." : "保存する"}
          </Button>
        </div>
      </div>
    </div>
  );
}
