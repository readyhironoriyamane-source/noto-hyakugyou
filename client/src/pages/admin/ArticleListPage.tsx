import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, ArrowLeft, Eye, GripVertical, Save } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useState, useRef, useCallback, useEffect } from "react";

export default function ArticleListPage() {
  const { user, loading: authLoading } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const { data: articles, isLoading } = trpc.articles.list.useQuery();

  // Drag-and-drop state
  const [orderedArticles, setOrderedArticles] = useState<typeof articles>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItemRef = useRef<number | null>(null);

  // Sync articles from API to local state
  useEffect(() => {
    if (articles) {
      setOrderedArticles([...articles]);
      setIsDirty(false);
    }
  }, [articles]);

  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      toast.success("記事を削除しました");
    },
    onError: (error) => {
      toast.error(`削除に失敗しました: ${error.message}`);
    },
  });

  const reorderMutation = trpc.articles.reorder.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      setIsDirty(false);
      toast.success("並び順を保存しました");
    },
    onError: (error) => {
      toast.error(`並び順の保存に失敗しました: ${error.message}`);
    },
  });

  // Drag handlers
  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
    dragItemRef.current = index;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((index: number) => {
    const fromIndex = dragItemRef.current;
    if (fromIndex === null || fromIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    setOrderedArticles((prev) => {
      if (!prev) return prev;
      const newList = [...prev];
      const [movedItem] = newList.splice(fromIndex, 1);
      newList.splice(index, 0, movedItem);
      return newList;
    });

    setIsDirty(true);
    setDragIndex(null);
    setDragOverIndex(null);
    dragItemRef.current = null;
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
    dragItemRef.current = null;
  }, []);

  // Save reorder
  const handleSaveOrder = () => {
    if (!orderedArticles) return;
    const items = orderedArticles.map((article, index) => ({
      id: article.id,
      sortOrder: index,
    }));
    reorderMutation.mutate({ items });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
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
      {/* Header */}
      <div className="bg-[#1D3A52] text-white">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setLocation("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                サイトへ戻る
              </Button>
              <div className="h-6 w-px bg-white/30" />
              <h1 className="text-xl font-bold">能登百業録 管理画面</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>{user.name || "管理者"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">記事管理</h2>
            <p className="text-gray-500 mt-1">
              {orderedArticles?.length || 0} 件の記事
              {isDirty && <span className="text-amber-600 ml-2">（並び順が変更されています）</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isDirty && (
              <Button
                onClick={handleSaveOrder}
                disabled={reorderMutation.isPending}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {reorderMutation.isPending ? "保存中..." : "並び順を保存"}
              </Button>
            )}
            <Button
              onClick={() => setLocation("/admin/articles/new")}
              className="bg-[#2D7F8F] hover:bg-[#236A7A]"
            >
              <Plus className="w-4 h-4 mr-2" />
              新規記事作成
            </Button>
          </div>
        </div>

        {/* Drag-and-drop hint */}
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <GripVertical className="w-4 h-4" />
          <span>左端のハンドルをドラッグして記事の表示順を変更できます。変更後は「並び順を保存」をクリックしてください。</span>
        </div>

        {/* Article List */}
        <div className="space-y-3">
          {orderedArticles?.map((article, index) => (
            <div
              key={article.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-150 ${
                dragIndex === index ? "opacity-40 scale-[0.98]" : ""
              } ${
                dragOverIndex === index && dragIndex !== index
                  ? "border-t-4 border-[#2D7F8F]"
                  : ""
              }`}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Drag Handle */}
                    <div className="flex items-center justify-center w-10 bg-gray-100 cursor-grab active:cursor-grabbing hover:bg-gray-200 transition-colors shrink-0">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Thumbnail */}
                    <div className="w-28 h-28 md:w-36 md:h-28 flex-shrink-0 bg-gray-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/400x300/e2e8f0/1e293b?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs font-mono">
                            ID: {article.id}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          {article.isCaseStudy && (
                            <Badge className="bg-[#2D7F8F] text-white text-xs">
                              活用事例
                            </Badge>
                          )}
                          <span className="text-xs text-gray-400 ml-auto">
                            順序: {(article as any).sortOrder ?? index}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {article.operator && `${article.operator} / `}
                          {article.location}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation(`/industry/${article.id}`)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          プレビュー
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation(`/admin/articles/${article.id}`)}
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1" />
                          編集
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
                              削除
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>記事を削除しますか？</AlertDialogTitle>
                              <AlertDialogDescription>
                                「{article.title}」を削除します。この操作は取り消せません。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>キャンセル</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => deleteMutation.mutate({ id: article.id })}
                              >
                                削除する
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {orderedArticles?.length === 0 && (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-gray-500 mb-4">まだ記事がありません</p>
                <Button
                  onClick={() => setLocation("/admin/articles/new")}
                  className="bg-[#2D7F8F] hover:bg-[#236A7A]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  最初の記事を作成する
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
