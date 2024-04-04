import type { DragDropManager } from 'dnd-core';
import { Edge } from 'reactflow';
import { EdgeChange } from 'reactflow';
import type { HandleProps } from 'reactflow';
import { MenuProps } from 'antd';
import { MutableRefObject } from 'react';
import { Node as Node_2 } from 'reactflow';
import { NodeChange } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { ProOptions } from 'reactflow';
import { default as React_2 } from 'react';
import { ReactFlowInstance } from 'reactflow';
import { RefObject } from 'react';
import type { StoreApi } from 'zustand';
import type { ThemeConfig as ThemeConfig_2 } from 'antd';
import type { UseBoundStore } from 'zustand';
import { useEdgesState } from 'reactflow';
import { useNodesState } from 'reactflow';
import type { WritableDraft } from 'immer/src/types/types-external';
import { WritableDraft as WritableDraft_2 } from 'immer/src/internal';

declare type BaseNode<Component extends string, InputName extends string, Inputs extends InputSchema<InputName>[], NodeData extends object = CreateDynamicType<Inputs>> = {
    type: NodeKind;
    kind: Component;
    icon?: React_2.ReactNode;
    color?: string;
    displayName: string;
    shortDescription?: string;
    group?: string;
    handleLeft?: boolean;
    handleRight?: boolean;
    inputs?: [...Inputs];
    generateNode?: CustomNodeSpecification<NodeData, Component>['generateNode'];
    renderNode?: CustomNodeSpecification<NodeData, Component>['renderNode'];
    onNodeAdd?: CustomNodeSpecification<NodeData, Component>['onNodeAdd'];
};

declare type BoolInput = {
    control: 'bool';
    label?: string;
};

declare type ControlToType<T> = T extends keyof InputTypeMap ? InputTypeMap[T] : never;

declare type CreateDynamicType<T extends ReadonlyArray<unknown>, Result = {}> = T extends readonly [infer First, ...infer Rest] ? First extends {
    control: infer Control extends string;
    name: infer Name extends string;
} ? CreateDynamicType<Rest, Result & SplitPath<Name, ControlToType<Control>>> : Result : Result;

export declare const createJdmNode: <Component extends string, InputName extends string, Inputs extends InputSchema<InputName>[]>(n: BaseNode<Component, InputName, Inputs, CreateDynamicType<Inputs, {}>>) => CustomNodeSpecification<any, Component>;

export declare type CustomNodeSpecification<Data extends object, Component extends string> = {
    type: NodeKind;
    kind: Component;
    color?: string;
    icon?: React_2.ReactNode;
    displayName: string;
    group?: string;
    documentationUrl?: string;
    shortDescription?: string;
    generateNode: (params: GenerateNodeParams_2) => Omit<DecisionNode<Data>, 'position' | 'id' | 'type' | 'content'> & {
        config?: Data;
    };
    renderNode: React_2.FC<MinimalNodeProps & {
        specification: MinimalNodeSpecification;
    }>;
    onNodeAdd?: (node: DecisionNode<{
        kind: Component;
        config: Data;
    }>) => Promise<DecisionNode<{
        kind: Component;
        config: Data;
    }>>;
};

export declare type DecisionEdge = {
    id: string;
    name?: string;
    sourceId: string;
    targetId: string;
    sourceHandle?: string;
    targetHandle?: string;
    type?: string;
};

export declare const DecisionGraph: React_2.ForwardRefExoticComponent<{
    manager?: DragDropManager | undefined;
} & DecisionGraphWrapperProps & DecisionGraphEmptyType & React_2.RefAttributes<{
    setDecisionGraph: (val: DecisionGraphType) => void;
    handleNodesChange: (nodesChange: NodeChange[]) => void;
    handleEdgesChange: (edgesChange: EdgeChange[]) => void;
    setNodes: (nodes: DecisionNode<any>[]) => void;
    addNodes: (nodes: DecisionNode<any>[]) => void;
    updateNode: (id: string, updater: (draft: WritableDraft_2<DecisionNode<any>>) => WritableDraft_2<DecisionNode<any>>) => void;
    removeNodes: (ids: string[]) => void;
    duplicateNodes: (ids: string[]) => void;
    copyNodes: (ids: string[]) => void;
    pasteNodes: () => void;
    setEdges: (edges: DecisionEdge[]) => void;
    addEdges: (edge: DecisionEdge[]) => void;
    removeEdges: (ids: string[]) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;
    closeTab: (id: string) => void;
    openTab: (id: string) => void;
    setSimulatorRequest: (req: string) => void;
    toggleSimulator: () => void;
    runSimulator: (context?: unknown) => Promise<Simulation>;
}>>;

declare type DecisionGraphContextProps = {};

declare type DecisionGraphEmptyType = {
    id?: string;
    defaultValue?: DecisionGraphType;
    value?: DecisionGraphType;
    disabled?: boolean;
    configurable?: boolean;
    components?: DecisionGraphStoreType['state']['components'];
    customNodes?: DecisionGraphStoreType['state']['customNodes'];
    onChange?: DecisionGraphStoreType['listeners']['onChange'];
    onSimulationRun?: DecisionGraphStoreType['listeners']['onSimulationRun'];
    onSimulatorOpen?: DecisionGraphStoreType['listeners']['onSimulatorOpen'];
    onReactFlowInit?: DecisionGraphStoreType['listeners']['onReactFlowInit'];
};

export declare type DecisionGraphProps = {
    manager?: DragDropManager;
} & DecisionGraphWrapperProps & DecisionGraphContextProps & DecisionGraphEmptyType;

export declare type DecisionGraphRef = GraphRef;

declare type DecisionGraphStoreType = {
    state: {
        id?: string;
        components: NodeSpecification[];
        disabled?: boolean;
        configurable?: boolean;
        decisionGraph: DecisionGraphType;
        hoveredEdgeId: string | null;
        openTabs: string[];
        activeTab: string;
        customNodes: CustomNodeSpecification<object, string>[];
        simulatorOpen: boolean;
        simulatorRequest?: string;
        simulate?: Simulation;
        simulatorLoading: boolean;
    };
    references: {
        nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
        edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
        graphClipboard: MutableRefObject<ReturnType<typeof useGraphClipboard>>;
    };
    actions: {
        setDecisionGraph: (val: DecisionGraphType) => void;
        handleNodesChange: (nodesChange: NodeChange[]) => void;
        handleEdgesChange: (edgesChange: EdgeChange[]) => void;
        setNodes: (nodes: DecisionNode[]) => void;
        addNodes: (nodes: DecisionNode[]) => void;
        updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode>) => void;
        removeNodes: (ids: string[]) => void;
        duplicateNodes: (ids: string[]) => void;
        copyNodes: (ids: string[]) => void;
        pasteNodes: () => void;
        setEdges: (edges: DecisionEdge[]) => void;
        addEdges: (edge: DecisionEdge[]) => void;
        removeEdges: (ids: string[]) => void;
        setHoveredEdgeId: (edgeId: string | null) => void;
        closeTab: (id: string) => void;
        openTab: (id: string) => void;
        setSimulatorRequest: (req: string) => void;
        toggleSimulator: () => void;
        runSimulator: (context?: unknown) => Promise<Simulation>;
    };
    listeners: {
        onChange?: (val: DecisionGraphType) => void;
        onSimulationRun?: (data: {
            decisionGraph: DecisionGraphType;
            context: unknown;
        }) => Promise<Simulation>;
        onSimulatorOpen?: (open: boolean) => void;
        onReactFlowInit?: (instance: ReactFlowInstance) => void;
    };
};

declare type DecisionGraphType = {
    nodes: DecisionNode[];
    edges: DecisionEdge[];
};

declare type DecisionGraphWrapperProps = {
    reactFlowProOptions?: ProOptions;
    defaultOpenMenu?: GraphAsideProps['defaultOpenMenu'];
};

export declare type DecisionNode<T = any> = {
    id: string;
    name: string;
    description?: string;
    type?: string;
    content?: T;
    position: Position;
};

declare type DecisionNodeProps = {
    name?: string;
    icon: React_2.ReactNode;
    type: React_2.ReactNode;
    disabled?: boolean;
    isSelected?: boolean;
    children?: React_2.ReactNode;
    actions?: React_2.ReactNode[];
    status?: 'error' | 'success';
    noBodyPadding?: boolean;
    color?: 'primary' | 'secondary' | string;
    menuItems?: MenuProps['items'];
    onNameChange?: (name: string) => void;
};

export declare const DecisionTable: React_2.FC<DecisionTableProps>;

declare type DecisionTableContextProps = {};

declare type DecisionTableEmptyType = {
    id?: string;
    defaultValue?: DecisionTableType;
    value?: DecisionTableType;
    disabled?: boolean;
    configurable?: boolean;
    disableHitPolicy?: boolean;
    activeRules?: string[];
    cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    minColWidth?: number;
    colWidth?: number;
    onChange?: (val: DecisionTableType) => void;
};

export declare type DecisionTableProps = {
    tableHeight: string | number;
    mountDialogsOnBody?: boolean;
    manager?: DragDropManager;
} & DecisionTableContextProps & DecisionTableEmptyType;

export declare type DecisionTableType = {
    hitPolicy: HitPolicy | string;
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    rules: Record<string, string>[];
};

declare type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

declare type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
    setState: (partial: Partial<T>) => void;
};

export declare const Expression: React_2.FC<ExpressionProps>;

declare type ExpressionControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: ExpressionEntry[];
    value?: ExpressionEntry[];
    onChange?: (value: ExpressionEntry[]) => void;
};

declare type ExpressionEntry = {
    id: string;
    key: string;
    value: string;
};

export declare type ExpressionProps = {
    manager?: DragDropManager;
} & ExpressionControllerProps;

declare const Function_2: React_2.FC<FunctionProps>;
export { Function_2 as Function }

export declare type FunctionProps = {
    disabled?: boolean;
    defaultValue?: string;
    disableDebug?: boolean;
    language?: string;
    value?: string;
    onChange?: (value: string) => void;
    trace?: SimulationTrace<SimulationTraceDataFunction>;
};

declare type GenerateNodeParams = {
    index: number;
};

declare type GenerateNodeParams_2 = {
    index: number;
};

declare type GraphAsideProps = {
    defaultOpenMenu?: Menu | false;
};

export declare const GraphNode: React_2.FC<GraphNodeProps>;

export declare type GraphNodeProps = {
    id: string;
    handleLeft?: boolean | Partial<HandleProps>;
    handleRight?: boolean | Partial<HandleProps>;
    className?: string;
    specification: MinimalNodeSpecification;
} & Partial<DecisionNodeProps>;

declare type GraphRef = DecisionGraphStoreType['actions'];

declare type HitPolicy = 'first' | 'collect';

declare type Input = unknown;

declare type InputSchema<Name extends string> = {
    name: Name;
} & (BoolInput | TextInput);

declare type InputTypeMap = {
    bool: boolean;
    text: string;
};

export declare const JdmConfigProvider: React_2.FC<JdmConfigProviderProps>;

export declare type JdmConfigProviderProps = {
    theme?: ThemeConfig;
    prefixCls?: string;
    children?: React_2.ReactNode;
};

declare type Menu = 'components';

export declare type MinimalNodeProps = Pick<NodeProps, 'id' | 'data' | 'selected'>;

export declare type MinimalNodeSpecification = Pick<NodeSpecification, 'color' | 'icon' | 'displayName' | 'documentationUrl'>;

export declare enum NodeKind {
    Input = "inputNode",
    Output = "outputNode",
    DecisionTable = "decisionTableNode",
    Function = "functionNode",
    Expression = "expressionNode",
    Switch = "switchNode",
    Custom = "customNode"
}

export declare type NodeSpecification<T = any> = {
    icon?: React_2.ReactNode;
    type: string;
    color?: DecisionNodeProps['color'];
    group?: string;
    displayName: string;
    documentationUrl?: string;
    shortDescription?: string;
    generateNode: (params: GenerateNodeParams) => Omit<DecisionNode<T>, 'position' | 'id' | 'type'>;
    renderNode: React_2.FC<MinimalNodeProps & {
        specification: MinimalNodeSpecification;
    }>;
    onNodeAdd?: (node: DecisionNode<T>) => Promise<DecisionNode<T>>;
};

declare type Output = unknown;

declare type Position = {
    x: number;
    y: number;
};

declare type SchemaSelectProps = {
    field: string;
    name?: string;
    items?: SchemaSelectProps[];
};

export declare type Simulation = {
    result?: SimulationOk;
} | {
    error?: SimulationError;
};

export declare type SimulationError = {
    title?: string;
    message?: string;
    data: {
        nodeId?: string;
    };
};

export declare type SimulationOk = {
    performance: string;
    result: Output;
    trace: Record<string, SimulationTrace>;
};

export declare type SimulationTrace<Trace = TraceDataVariants> = {
    input: Input | null;
    output: Output | null;
    name: string;
    id: string;
    performance: string | null;
    traceData: Trace;
};

export declare type SimulationTraceDataExpression = object;

export declare type SimulationTraceDataFunction = {
    log?: TraceFunctionLog[];
};

export declare type SimulationTraceDataSwitch = {
    statements: {
        id: string;
    }[];
};

export declare type SimulationTraceDataTable = {
    index: number;
    reference_map: Record<string, unknown>;
    rule: Record<string, string>;
};

declare type SplitPath<Path extends string, Obj> = Path extends `${infer Prefix}.${infer Rest}` ? {
    [K in Prefix]: SplitPath<Rest, Obj>;
} : {
    [K in Path]: Obj;
};

declare type TableCellProps = {
    column?: {
        colType: string;
    } & TableSchemaItem;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

declare type TableSchemaItem = {
    id: string;
    name: string;
    field?: string;
    type: string;
    defaultValue?: string;
};

declare type TextInput = {
    control: 'text';
    label?: string;
};

export declare type ThemeConfig = Omit<ThemeConfig_2, 'algorithm'> & {
    mode?: 'light' | 'dark';
};

declare type TraceDataVariants = SimulationTraceDataTable | SimulationTraceDataFunction | SimulationTraceDataExpression | SimulationTraceDataSwitch | null;

declare type TraceFunctionLog = {
    lines: string[];
    msSinceRun: number;
};

export declare function useDecisionGraphActions(): DecisionGraphStoreType['actions'];

export declare function useDecisionGraphListeners<T>(selector: (state: DecisionGraphStoreType['listeners']) => T, equals?: (a: any, b: any) => boolean): T;

export declare function useDecisionGraphRaw(): {
    stateStore: ExposedStore<{
        id?: string | undefined;
        components: NodeSpecification[];
        disabled?: boolean | undefined;
        configurable?: boolean | undefined;
        decisionGraph: DecisionGraphType;
        hoveredEdgeId: string | null;
        openTabs: string[];
        activeTab: string;
        customNodes: CustomNodeSpecification<object, string>[];
        simulatorOpen: boolean;
        simulatorRequest?: string | undefined;
        simulate?: Simulation | undefined;
        simulatorLoading: boolean;
    }>;
    listenerStore: ExposedStore<{
        onChange?: ((val: DecisionGraphType) => void) | undefined;
        onSimulationRun?: ((data: {
            decisionGraph: DecisionGraphType;
            context: unknown;
        }) => Promise<Simulation>) | undefined;
        onSimulatorOpen?: ((open: boolean) => void) | undefined;
        onReactFlowInit?: ((instance: ReactFlowInstance) => void) | undefined;
    }>;
    referenceStore: ExposedStore<{
        nodesState: React_2.MutableRefObject<[Node_2<unknown, string | undefined>[], React_2.Dispatch<React_2.SetStateAction<Node_2<unknown, string | undefined>[]>>, (changes: NodeChange[]) => void]>;
        edgesState: React_2.MutableRefObject<[Edge<unknown>[], React_2.Dispatch<React_2.SetStateAction<Edge<unknown>[]>>, (changes: EdgeChange[]) => void]>;
        graphClipboard: React_2.MutableRefObject<{
            copyNodes: (nodes: Node_2[]) => Promise<void>;
            pasteNodes: () => Promise<void>;
        }>;
    }>;
    actions: {
        setDecisionGraph: (val: DecisionGraphType) => void;
        handleNodesChange: (nodesChange: NodeChange[]) => void;
        handleEdgesChange: (edgesChange: EdgeChange[]) => void;
        setNodes: (nodes: DecisionNode<any>[]) => void;
        addNodes: (nodes: DecisionNode<any>[]) => void;
        updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode<any>>) => void;
        removeNodes: (ids: string[]) => void;
        duplicateNodes: (ids: string[]) => void;
        copyNodes: (ids: string[]) => void;
        pasteNodes: () => void;
        setEdges: (edges: DecisionEdge[]) => void;
        addEdges: (edge: DecisionEdge[]) => void;
        removeEdges: (ids: string[]) => void;
        setHoveredEdgeId: (edgeId: string | null) => void;
        closeTab: (id: string) => void;
        openTab: (id: string) => void;
        setSimulatorRequest: (req: string) => void;
        toggleSimulator: () => void;
        runSimulator: (context?: unknown) => Promise<Simulation>;
    };
};

export declare function useDecisionGraphReferences<T>(selector: (state: DecisionGraphStoreType['references']) => T, equals?: (a: any, b: any) => boolean): T;

export declare function useDecisionGraphState<T>(selector: (state: DecisionGraphStoreType['state']) => T, equals?: (a: any, b: any) => boolean): T;

declare const useGraphClipboard: (reactFlow: RefObject<ReactFlowInstance | null>, wrapper: RefObject<HTMLDivElement | null>) => {
    copyNodes: (nodes: Node_2[]) => Promise<void>;
    pasteNodes: () => Promise<void>;
};

export { }
