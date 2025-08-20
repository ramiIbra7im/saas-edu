"use client";

import { FaUsers, FaBoxOpen, FaMoneyBillAlt, FaChartLine } from "react-icons/fa";

export default function DashboardCards() {
    const stats = [
        { title: "عدد المستخدمين", icon: <FaUsers />, value: 124 },
        { title: "عدد الطلبات", icon: <FaBoxOpen />, value: 32 },
        { title: "الإيرادات", icon: <FaMoneyBillAlt />, value: "1,200 ج.م" },
        { title: "نشاط اليوم", icon: <FaChartLine />, value: "+14%" },
    ];

    return (
        <div className="row">
            {stats.map((stat, idx) => (
                <div key={idx} className="col-md-6 col-lg-3 mb-4">
                    <div className="border rounded shadow-sm p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="text-muted">{stat.title}</h6>
                            <h4 className="fw-bold">{stat.value}</h4>
                        </div>
                        <div className="fs-2 text-primary">{stat.icon}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
