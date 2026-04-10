import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import type { QuerySelectionModel, SelectAllContext, ExportSelectionContext } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

const TOTAL_ROWS = 1_000_000;
const QUERY_KEY = "demo-query-v1";

export const QueryAwareSelectAll: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(10, true, true);

    const [querySelection, setQuerySelection] = React.useState<QuerySelectionModel>({ mode: "none" });

    const getRowKey = React.useCallback((row: number): string => {
        return `row-${row}`;
    }, []);

    const onSelectAll = React.useCallback(
        (_ctx: SelectAllContext) => {
            setQuerySelection({
                mode: "all-in-query",
                queryKey: QUERY_KEY,
                excludedRowKeys: new Set(),
                estimatedTotalRows: TOTAL_ROWS,
            });
        },
        []
    );

    const onExportSelection = React.useCallback(
        async (ctx: ExportSelectionContext) => {
            // In a real app, this would trigger a server-side export
            const qs = ctx.querySelection;
            if (qs?.mode === "all-in-query") {
                alert(
                    `Export triggered!\nQuery: ${qs.queryKey}\nExcluded rows: ${qs.excludedRowKeys.size}\nFormat: ${ctx.format}`
                );
            } else if (qs?.mode === "explicit") {
                alert(
                    `Export triggered!\nSelected rows: ${qs.selectedRowKeys.size}\nFormat: ${ctx.format}`
                );
            } else {
                alert(`Export triggered!\nFormat: ${ctx.format}`);
            }
        },
        []
    );

    const selectionSummary = React.useMemo(() => {
        if (querySelection.mode === "none") return "No rows selected";
        if (querySelection.mode === "explicit") return `${querySelection.selectedRowKeys.size} rows selected`;
        if (querySelection.mode === "all-in-query") {
            const excluded = querySelection.excludedRowKeys.size;
            if (excluded === 0) {
                return `All ${(querySelection.estimatedTotalRows ?? 0).toLocaleString()} rows selected`;
            }
            return `All rows selected except ${excluded}`;
        }
        return "";
    }, [querySelection]);

    return (
        <BeautifulWrapper
            title="Query-Aware Select All"
            description={
                <Description>
                    <p>
                        When <PropName>selectAllBehavior</PropName> is set to <PropName>&quot;query&quot;</PropName>,
                        clicking the header checkbox or pressing Ctrl+A triggers <PropName>onSelectAll</PropName> instead
                        of selecting all cells in memory. This enables &quot;select all 1M rows&quot; semantics without
                        materializing the entire dataset.
                    </p>
                    <p>
                        <strong>Selection: {selectionSummary}</strong>
                    </p>
                    <p>
                        <button
                            onClick={() => setQuerySelection({ mode: "none" })}
                            style={{ marginRight: 8 }}>
                            Clear Selection
                        </button>
                        <button
                            onClick={() =>
                                void onExportSelection({
                                    gridSelection: {
                                        columns: { length: 0 } as any,
                                        rows: { length: 0 } as any,
                                    },
                                    querySelection,
                                    format: "csv",
                                })
                            }>
                            Export Selected
                        </button>
                    </p>
                    <p style={{ fontSize: "0.85em", color: "#666" }}>
                        Try: Click header checkbox to select all {TOTAL_ROWS.toLocaleString()} rows, then click
                        individual row checkboxes to exclude specific rows. Copy (Ctrl+C) with all-in-query selection
                        will trigger the export path instead of clipboard.
                    </p>
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={1000}
                rowMarkers="checkbox-visible"
                rowSelect="multi"
                selectAllBehavior="query"
                querySelection={querySelection}
                onQuerySelectionChange={setQuerySelection}
                onSelectAll={onSelectAll}
                exportSelection={onExportSelection}
                getRowKey={getRowKey}
                copyCellCap={50_000}
                getCellsForSelection={true}
            />
        </BeautifulWrapper>
    );
};
