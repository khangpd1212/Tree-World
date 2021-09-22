import "styles/admin.scss"
export default function AdminLayout({children}) {
    return <div className="root-admin">
        <div className="head">
            Header
        </div>
        {children}
        <div className="footer">
            Footer
        </div>
    </div>
}