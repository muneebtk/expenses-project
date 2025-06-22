import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const ExpenseGrid = ({ expenses = [], columnDefs }) => {
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "500px",
        minWidth: "50vw",
      }}
    >
      <AgGridReact
        rowData={expenses}
        columnDefs={columnDefs}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        rowHeight={40}
        headerHeight={50}
      />
    </div>
  );
};

export default ExpenseGrid;
