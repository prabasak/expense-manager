import React from "react";

import "./expenseEntryItem.css";
import styles from "./expenseEntryItem.module.css";

// import FormattedMoney from "./formattedMoney";
// import FormattedDate from "./formattedDate";

class ExpenseEntryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind();
    this.handleMouseLeave = this.handleMouseLeave.bind();
    this.handleMouseOver = this.handleMouseOver.bind();

    this.state = {
      items: this.props.items
    };
  }
  // Life cycle Hooks
  // componentDidMount() {
  //   console.log("ExpenseEntryItemList :: Initialize :: componentDidMount :: Component mounted");
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("ExpenseEntryItemList :: Update :: shouldComponentUpdate invoked :: Before update");
  //   return true;
  // }
  // static getDerivedStateFromProps(props, state) {
  //   console.log("ExpenseEntryItemList :: Initialize / Update :: getDerivedStateFromProps :: Before update");
  //   return null;
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log("ExpenseEntryItemList :: Update :: getSnapshotBeforeUpdate :: Before update");
  //   return null;
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("ExpenseEntryItemList :: Update :: componentDidUpdate :: Component updated");
  // }
  // componentWillUnmount() {
  //   console.log("ExpenseEntryItemList :: Remove :: componentWillUnmount :: Component unmounted");
  // }

  handleMouseEnter(e) {
    e.target.parentNode.classList.add("highlight");
  }
  handleMouseLeave(e) {
    e.target.parentNode.classList.remove("highlight");
  }
  handleMouseOver(e) {
    console.log("The mouse is at (" + e.clientX + ", " + e.clientY + ")");
  }
  handleDelete = (id, e) => {
    console.log(id);

    this.setState((state, props) => {
      let items = [];

      state.items.forEach((item, idx) => {
        if (item.id !== id) {
          items.push(item);
        }
      });
      let newState = {
        items: items
      };
      return newState;
    });
  };

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.state.items.length; i++) {
      total += this.state.items[i].amount;
    }
    return total;
  }
  render() {
    const lists = this.props.items.map((item) => (
      <tr
        key={item.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{new Date(item.spendDate).toDateString()}</td>
        <td>{item.category}</td>
        <td>
          <button type="button" onClick={(e) => this.handleDelete(item.id, e)}>
            Remove
          </button>
        </td>
      </tr>
    ));
    return (
      <div className={styles.itemStyle}>
        {/* <div>
          <b>Item:</b> <em>{this.props.item.name}</em>
        </div>
        <div>
          <b>Amount:</b>{" "}
          <em>
            <FormattedMoney value={this.props.item.amount} />
          </em>
        </div>
        <div>
          <b>Spend Date:</b>
          <em>
            <FormattedDate value={this.props.item.spendDate} />
          </em>
        </div>
        <div>
          <b>Category:</b> <em>{this.props.item.category}</em>
        </div> */}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {lists}
            <tr>
              <td colSpan="1" style={{ textAlign: "right" }}>
                Total Amount
              </td>
              <td colSpan="4" style={{ textAlign: "left" }}>
                {this.getTotal()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExpenseEntryItem;
