import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 px-0">
                    <Sidebar />
                </div>

                {/* Main content */}
                <div className="col-md-9 col-lg-10 px-4 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
