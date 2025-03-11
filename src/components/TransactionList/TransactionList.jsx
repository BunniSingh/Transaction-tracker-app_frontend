import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, fetchTransactions } from "../../Redux/transactionSlice";

import './TransactionList.css'
import TransactionForm from "../TransactionForm/TransactionForm";


const TransactionList = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transactions);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState("");
    // console.log("TransactionList component render")
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const editTransaction = (id) => {
        setIsEditMode(true)
        setEditId(id)
    }

    return (
        <div>
            <h2>{isEditMode ? "Edit Transactions" : "Transactions"}</h2>
            <ul>
                {
                    !isEditMode ?
                        transactions.map((tx) => (
                            <li key={tx._id}>
                                {tx.description} - ₹{tx.amount} ({new Date(tx.updatedAt).toLocaleDateString()})
                                <div className="btn">
                                    <button onClick={() => editTransaction(tx._id)}>✏️</button>
                                    <button onClick={() => dispatch(deleteTransaction(tx._id))}>❌</button>
                                </div>
                            </li>
                        ))
                        :
                        <TransactionForm
                            transactions={transactions}
                            id={editId}
                            setEditId={setEditId}
                            setIsEditMode={setIsEditMode}
                        />
                }
            </ul>
        </div>
    );
};

export default TransactionList;
