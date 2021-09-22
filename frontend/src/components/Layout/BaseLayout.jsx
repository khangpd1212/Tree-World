export default function BaseLayout({children}) {
    return <div className="root-base">
        <div className="head">
            Header
        </div>
        {children}
        <div className="footer">
            Footer
        </div>
    </div>
}