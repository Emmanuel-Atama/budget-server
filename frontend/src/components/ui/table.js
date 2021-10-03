export default function Table({ headers, data }) {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        {headers.map(header => <th scope="col">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        const tds = [];

                        for (const key in item) {
                            tds.push(<td>{item[key]}</td>);
                        }
                        
                        return (
                            <tr>{tds}</tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
        </>
    );
}