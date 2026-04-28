import{R as e}from"./iframe-B20zWZGi.js";import{D as x}from"./data-editor-all-CQRp_nQ0.js";import{u as h,B as E,D as C,P as s,d as f}from"./utils-B9MKiNgP.js";import{S as R}from"./story-utils-CmOVw3m-.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-BHae_Yuv.js";import"./throttle-C3cmtJYG.js";import"./marked.esm-BgNJ2wQC.js";import"./flatten-CASnL9nJ.js";import"./scrolling-data-grid-DtU-3vun.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const D={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(R,null,e.createElement(r,null))]},u=1e6,A="demo-query-v1",i="all-in-query",n=()=>{const{cols:r,getCellContent:y}=h(10,!0,!0),[o,c]=e.useState({mode:"none"}),S=e.useCallback(t=>`row-${t}`,[]),w=e.useCallback(t=>{c({mode:i,queryKey:A,excludedRowKeys:new Set,estimatedTotalRows:u})},[]),a=e.useCallback(async t=>{const l=t.querySelection;(l==null?void 0:l.mode)===i?alert(`Export triggered!
Query: ${l.queryKey}
Excluded rows: ${l.excludedRowKeys.size}
Format: ${t.format}`):(l==null?void 0:l.mode)==="explicit"?alert(`Export triggered!
Selected rows: ${l.selectedRowKeys.size}
Format: ${t.format}`):alert(`Export triggered!
Format: ${t.format}`)},[]),g=e.useMemo(()=>{if(o.mode==="none")return"No rows selected";if(o.mode==="explicit")return`${o.selectedRowKeys.size} rows selected`;if(o.mode===i){const t=o.excludedRowKeys.size;return t===0?`All ${(o.estimatedTotalRows??0).toLocaleString()} rows selected`:`All rows selected except ${t}`}return""},[o]);return e.createElement(E,{title:"Query-Aware Select All",description:e.createElement(C,null,e.createElement("p",null,"When ",e.createElement(s,null,"selectAllBehavior")," is set to ",e.createElement(s,null,'"query"'),", clicking the header checkbox or pressing Ctrl+A triggers ",e.createElement(s,null,"onSelectAll"),' instead of selecting all cells in memory. This enables "select all 1M rows" semantics without materializing the entire dataset.'),e.createElement("p",null,e.createElement("strong",null,"Selection: ",g)),e.createElement("p",null,e.createElement("button",{onClick:()=>c({mode:"none"}),style:{marginRight:8}},"Clear Selection"),e.createElement("button",{onClick:()=>void a({gridSelection:{columns:{length:0},rows:{length:0}},querySelection:o,format:"csv"})},"Export Selected")),e.createElement("p",{style:{fontSize:"0.85em",color:"#666"}},"Try: Click header checkbox to select all ",u.toLocaleString()," rows, then click individual row checkboxes to exclude specific rows. Copy (Ctrl+C) with all-in-query selection will trigger the export path instead of clipboard."))},e.createElement(x,{...f,getCellContent:y,columns:r,rows:1e3,rowMarkers:"checkbox-visible",rowSelect:"multi",selectAllBehavior:"query",querySelection:o,onQuerySelectionChange:c,onSelectAll:w,exportSelection:a,getRowKey:S,copyCellCap:5e4,getCellsForSelection:!0}))};var d,m,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, true, true);
  const [querySelection, setQuerySelection] = React.useState<QuerySelectionModel>({
    mode: "none"
  });
  const getRowKey = React.useCallback((row: number): string => {
    return \`row-\${row}\`;
  }, []);
  const onSelectAll = React.useCallback((_ctx: SelectAllContext) => {
    setQuerySelection({
      mode: ALL_IN_QUERY,
      queryKey: QUERY_KEY,
      excludedRowKeys: new Set(),
      estimatedTotalRows: TOTAL_ROWS
    });
  }, []);
  const onExportSelection = React.useCallback(async (ctx: ExportSelectionContext) => {
    // In a real app, this would trigger a server-side export
    const qs = ctx.querySelection;
    if (qs?.mode === ALL_IN_QUERY) {
      alert(\`Export triggered!\\nQuery: \${qs.queryKey}\\nExcluded rows: \${qs.excludedRowKeys.size}\\nFormat: \${ctx.format}\`);
    } else if (qs?.mode === "explicit") {
      alert(\`Export triggered!\\nSelected rows: \${qs.selectedRowKeys.size}\\nFormat: \${ctx.format}\`);
    } else {
      alert(\`Export triggered!\\nFormat: \${ctx.format}\`);
    }
  }, []);
  const selectionSummary = React.useMemo(() => {
    if (querySelection.mode === "none") return "No rows selected";
    if (querySelection.mode === "explicit") return \`\${querySelection.selectedRowKeys.size} rows selected\`;
    if (querySelection.mode === ALL_IN_QUERY) {
      const excluded = querySelection.excludedRowKeys.size;
      if (excluded === 0) {
        return \`All \${(querySelection.estimatedTotalRows ?? 0).toLocaleString()} rows selected\`;
      }
      return \`All rows selected except \${excluded}\`;
    }
    return "";
  }, [querySelection]);
  return <BeautifulWrapper title="Query-Aware Select All" description={<Description>
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
                        <button onClick={() => setQuerySelection({
        mode: "none"
      })} style={{
        marginRight: 8
      }}>
                            Clear Selection
                        </button>
                        <button onClick={() => void onExportSelection({
        gridSelection: {
          columns: {
            length: 0
          } as any,
          rows: {
            length: 0
          } as any
        },
        querySelection,
        format: "csv"
      })}>
                            Export Selected
                        </button>
                    </p>
                    <p style={{
      fontSize: "0.85em",
      color: "#666"
    }}>
                        Try: Click header checkbox to select all {TOTAL_ROWS.toLocaleString()} rows, then click
                        individual row checkboxes to exclude specific rows. Copy (Ctrl+C) with all-in-query selection
                        will trigger the export path instead of clipboard.
                    </p>
                </Description>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} rowMarkers="checkbox-visible" rowSelect="multi" selectAllBehavior="query" querySelection={querySelection} onQuerySelectionChange={setQuerySelection} onSelectAll={onSelectAll} exportSelection={onExportSelection} getRowKey={getRowKey} copyCellCap={50_000} getCellsForSelection={true} />
        </BeautifulWrapper>;
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const P=["QueryAwareSelectAll"];export{n as QueryAwareSelectAll,P as __namedExportsOrder,D as default};
