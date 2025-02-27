import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  createGrid,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
export interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Grid Options: Defines the grid configuration
const StoreManage: GridOptions<IRow> = {
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ],
  columnDefs: [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ],
  defaultColDef: {
    flex: 1,
  },
};

// Create Grid and assign API reference
const gridApi: GridApi = createGrid(
  document.querySelector<HTMLElement>("#myGrid")!,
  StoreManage,
);

export default StoreManage;
