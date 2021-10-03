import { useStore } from "../../state/store";
import DashboardHeader from "../dashboard/DashboardHeader";
import Table from "../ui/table";

export default function Main() {
    const {
        expenses,
        income
    } = useStore(state => state);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <DashboardHeader />

            {/* Chart canvas */}
            {/* <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

            <h2>Expenses</h2>
            <Table
                headers={['#', 'Name', 'Source', 'Amount']}
                data={expenses.map(expense => {
                    delete expense.timestamp;
                    return expense;
                })}
            />

            <h2>Income</h2>
            <Table
                headers={['#', 'Source', 'Amount']}
                data={income.map(income => {
                    delete income.timestamp;
                    return income;
                })}
            />
        </main>
    );
}