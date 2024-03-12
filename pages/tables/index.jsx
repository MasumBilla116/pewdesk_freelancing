import TableFour from "../../components/Tables/TableFour";
import TableOne from "../../components/Tables/TableOne";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";




const TablesPage = () => {
  return (
    <>


      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
        <TableFour />
      </div>
    </>
  );
};

export default TablesPage;
