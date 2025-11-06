import { useDocuments } from "@sanity/sdk-react";
import {
  Button,
  Card,
  Flex,
  Grid,
  Spinner,
  Stack,
  Switch,
  Text,
} from "@sanity/ui";
import React, { Suspense, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import { useBatchProcessState } from "../hooks/useBatchProcessState";
import { useDocumentFilter } from "../hooks/useDocumentFilter";
import BatchTranslationPanel from "./BatchTranslationPanel";
import DocumentDetail from "./DocumentDetail";
import PostPreviewItem from "./DocumentPrevewItem";
import Loading from "./Loading";
import LocaleFallbackMessage from "./LocaleFallbackMessage";
import StatusSelector from "./StatusSelector";

const Documents = () => {
  const {
    selectedPost,
    setSelectedPost,
    languages,
    isBatchMode,
    setIsBatchMode,
    selectedDocuments,
    clearSelection,
    toggleDocumentSelection,
    status,
  } = useApp();

  // Use the comprehensive batch process state
  const { shouldDisableDocumentSelection, shouldDisableBatchModeToggle } =
    useBatchProcessState();

  // Ref to preserve scroll position
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State to track load more scroll restoration
  const scrollPositionToRestore = useRef<number | null>(null);
  const previousDataLength = useRef<number>(0);

  const filter = useDocumentFilter();

  const { data, hasMore, loadMore } = useDocuments({
    documentType: "post",
    filter,
    orderings: [{ field: "_createdAt", direction: "desc" }],
    batchSize: 20,
  });

  // Watch for data changes to restore scroll position after load more
  useEffect(() => {
    const currentLength = data?.length || 0;

    // If data length increased and we have a scroll position to restore
    if (
      currentLength > previousDataLength.current &&
      scrollPositionToRestore.current !== null
    ) {
      // Use double requestAnimationFrame to ensure DOM is fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (
            scrollContainerRef.current &&
            scrollPositionToRestore.current !== null
          ) {
            scrollContainerRef.current.scrollTop =
              scrollPositionToRestore.current;
            scrollPositionToRestore.current = null; // Clear after restoring
          }
        });
      });
    }

    previousDataLength.current = currentLength;
  }, [data]);

  // Handle load more with scroll preservation
  const handleLoadMore = () => {
    // Preserve scroll position before loading more
    const scrollTop = scrollContainerRef.current?.scrollTop;

    if (scrollTop !== undefined) {
      scrollPositionToRestore.current = scrollTop;
    }

    loadMore();
  };

  const handleBatchModeToggle = (enabled: boolean) => {
    // Prevent toggling during batch operations
    if (shouldDisableBatchModeToggle) {
      return;
    }

    setIsBatchMode(enabled);
    if (!enabled) {
      clearSelection();
    }
    // Close document detail when entering batch mode
    if (enabled && selectedPost) {
      setSelectedPost(null);
    }
  };

  // Auto-disable batch mode when switching to statuses that don't support it
  React.useEffect(() => {
    if (isBatchMode && status === "fully-translated") {
      setIsBatchMode(false);
      clearSelection();
    }
  }, [status, isBatchMode, setIsBatchMode, clearSelection]);

  const handleDocumentClick = (post: {
    documentId: string;
    _id: string;
    _rev: string;
    [key: string]: any;
  }) => {
    if (isBatchMode) {
      // Prevent selection changes during batch operations
      if (shouldDisableDocumentSelection) {
        return;
      }

      // Preserve scroll position before state change
      const scrollTop = scrollContainerRef.current?.scrollTop;

      // In batch mode, toggle document selection
      toggleDocumentSelection(post.documentId);

      // Restore scroll position after state update
      if (scrollTop !== undefined) {
        // Use requestAnimationFrame to ensure the DOM has updated
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollTop;
          }
        });
      }
      return;
    }
    setSelectedPost(post);
  };

  // Show fallback message if no languages are available
  if (!languages || languages.length === 0) {
    return (
      <div className="p-4">
        <LocaleFallbackMessage
          title="Languages Not Available"
          message="The app needs to load supported languages before showing documents."
          suggestion="Please wait for languages to load, or refresh the page if they don't appear."
          buttonText="Refresh Page"
          variant="info"
        />
      </div>
    );
  }

  return (
    <Grid columns={6}>
      {/* Left side of the screen */}
      <Card
        columnStart={1}
        columnEnd={4}
        className="max-h-[92vh] overflow-y-auto flex flex-col"
      >
        <Suspense fallback={<Loading />}>
          {/* Fixed header */}
          <div className="bg-white z-10 pt-4 px-4 pb-2 border-b border-gray-200 flex-shrink-0 sticky z-0 top-0">
            <Stack space={3}>
              <StatusSelector />
              {(status === "untranslated" ||
                status === "partially-translated" ||
                status === "all") && (
                <Card padding={3} radius={2} tone="transparent">
                  <Flex gap={3} align="center" justify="space-between">
                    <Flex align="center" gap={3}>
                      <Text size={2} weight="medium">
                        Batch Mode
                      </Text>
                      <Switch
                        checked={isBatchMode}
                        onChange={(event) =>
                          handleBatchModeToggle(event.currentTarget.checked)
                        }
                        disabled={shouldDisableBatchModeToggle}
                      />
                    </Flex>
                    {isBatchMode && selectedDocuments.length > 0 && (
                      <Flex align="center" gap={3}>
                        <Text size={1} muted>
                          {selectedDocuments.length} selected
                        </Text>
                        <Button
                          mode="ghost"
                          tone="default"
                          text="Deselect All"
                          onClick={clearSelection}
                          disabled={shouldDisableDocumentSelection}
                          size={1}
                        />
                      </Flex>
                    )}
                  </Flex>
                </Card>
              )}
            </Stack>
          </div>

          {/* Scrollable document list */}
          <div ref={scrollContainerRef}>
            <div className="pt-2 px-4">
              <ul>
                {data?.map((post) => {
                  const isDetailSelected =
                    selectedPost?.documentId === post.documentId;
                  const isBatchSelected =
                    isBatchMode && selectedDocuments.includes(post.documentId);
                  return (
                    <li
                      key={post.documentId}
                      className={
                        "border-b border-gray-200 dark:border-gray-200"
                      }
                    >
                      <button
                        onClick={() => handleDocumentClick(post)}
                        disabled={isBatchMode && shouldDisableDocumentSelection}
                        className={`w-full text-left justify-start p-3 border-none outline-none trasnsition-background duration-200
                      ${
                        isBatchMode && shouldDisableDocumentSelection
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }
                      ${
                        isDetailSelected && !isBatchMode
                          ? "bg-blue-50 dark:bg-blue-500/10 border-l-4 outline border-none "
                          : isBatchSelected
                            ? "bg-blue-100 dark:bg-blue-600/20 border-l-4 border-blue-400"
                            : !shouldDisableDocumentSelection &&
                              "hover:bg-gray-55 hover:bg-blue-300/60"
                      }
                    `}
                      >
                        <Suspense fallback={<Spinner />}>
                          <PostPreviewItem {...post} />
                        </Suspense>
                      </button>
                    </li>
                  );
                })}
                {hasMore && (
                  <li className="flex py-3">
                    <Button
                      className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 my-4"
                      onClick={handleLoadMore}
                      text="Load more"
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Suspense>
      </Card>
      {/* Right side of the screen */}
      <Card
        borderLeft
        columnStart={4}
        columnEnd={7}
        className="overflow-hidden flex flex-col"
      >
        <Suspense fallback={<Loading />}>
          <div className="sticky">
            <div style={{ display: isBatchMode ? "none" : "block" }}>
              <DocumentDetail selectedPost={selectedPost} />
            </div>
            {isBatchMode &&
              (selectedDocuments.length > 0 ? (
                <Stack padding={4} space={4}>
                  <Text size={2} weight="semibold">
                    Batch Translation Details
                  </Text>
                  <BatchTranslationPanel />
                </Stack>
              ) : (
                <Stack
                  padding={4}
                  space={4}
                  className="h-full justify-center items-center"
                >
                  <Text size={1} muted className="text-center">
                    Select documents from the list to start batch translation
                  </Text>
                </Stack>
              ))}
          </div>
        </Suspense>
      </Card>
    </Grid>
  );
};

export default Documents;
