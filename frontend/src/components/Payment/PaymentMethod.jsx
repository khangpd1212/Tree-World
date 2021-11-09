export default function PaymentMethod() {
    return (
        <div className="method">
            <div className="method__top">
                <span className="method__top--title">
                    Payment method
                </span>
                <button className="method__top--creadit">Creadit/Debit cart</button>
                <button className="method__top--wallet">Electronic Wallet</button>
                <button className="method__top--cod">Cod</button>
            </div>
            <hr/>
            <div className="method__container">
                <div className="momo">
                    <input className="momo__checkbox" type="radio"/>
                    <img src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg" alt=""/>
                    <div className="momo__title">
                        <span className="momo__title--1">MOMO Wallet</span>
                        <span>account balance: $289.054</span>
                    </div>
                </div>
                <div className="bank">
                    <input type="radio" className="bank" />
                    <img src="https://appoda.com/wp-content/uploads/2015/10/340x340bb-80.png" alt=""/>
                    <div className="bank__title">
                        <span className="bank__title--1">Agribank</span>
                        <span>*6877</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="method__bottom">
                <div className="method__bottom--content">
                    <div className="product__total title-submenu">
                        <span>Product total:</span>
                        <span>$28.00</span>
                    </div>
                    <div className="shipping__fee title-submenu">
                        <span>Shipping fee:</span>
                        <span>$5.00</span>
                    </div>
                    <div className="shop__voucher title-submenu">
                        <span>Shop Voucher:</span>
                        <span>-$4.20</span>
                    </div>
                    <div className="total__payment title-submenu">
                        <span className="total__title">Total Payment:</span>
                        <span className="total">$28.80</span>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="order__now">
                <div className="back__button">
                    {/* <LeftOutlined /> */}
                    <span>back</span>
                </div>
                <button className="order__button">Order now</button>
                
            </div>
        </div>
    )
}