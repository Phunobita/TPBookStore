import React from "react";
import { Link } from "react-router-dom";
import formatCash from "../../../utils/formatCash";
const OrderDetailProducts = (props) => {
  const { order, loading } = props;
  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((accumulate, item) => accumulate + item.price * item.qty, 0);
  }
  return (
    <table className="order-detail__admin table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "50%" }}>Sản phẩm</th>
          <th style={{ width: "15%" }}>Số lượng</th>
          <th style={{ width: "15%" }}>Đơn giá</th>
          <th style={{ width: "15%" }} className="text-end">
            Thành tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {order?.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to={`/product/${item.product.slug}`}>
                <div className="left">
                  <img src={item.image} alt={item.name} style={{ width: "100px", height: "auto" }} className="img-xs" />
                </div>
                <div className="info"> {item.name.length >= 55 ? `${item.name.slice(0, 55)}...` : ` ${item.name}`}</div>
              </Link>
            </td>
            <td>{item.qty} </td>
            <td>{formatCash(item.price)} </td>
            <td className="text-end"> {formatCash(item.qty * item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
