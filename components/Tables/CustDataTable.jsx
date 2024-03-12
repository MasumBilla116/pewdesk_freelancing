import DataTable from "react-data-table-component";

const CustDataTable = ({ columns, data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default CustDataTable;
