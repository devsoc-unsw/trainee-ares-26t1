import WoodContainer from "../components/WoodContainer";

const DashboardPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">Enter </p>
                        <p> to save</p>
                    </div>
                    <div className="flex flex-row mt-2">
                        <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">Esc </p>
                        <p>to cancel</p>
                    </div>
                </div>
            <div/>
            <div><p>Fence for currency</p></div>
            </div>
        </div>
    )
}

export default DashboardPage;