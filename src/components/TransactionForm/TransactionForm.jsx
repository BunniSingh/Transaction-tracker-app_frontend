import React, { useEffect, useState } from "react";
import { addTransaction, editTransaction, fetchTransactions } from "../../Redux/transactionSlice";
import { useDispatch } from "react-redux";

import './TransactionForm.css'


const TransactionForm = (props) => {
    const {transactions, id, setEditId, setIsEditMode} = props;
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(id){
            let idx = transactions.findIndex(ele => ele._id === id);
            setAmount(transactions[idx].amount);
            setDescription(transactions[idx].description)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(id){
            // console.log("form", {amount, description})
            await dispatch(editTransaction({ id, updatedData: { amount, description } }))
            dispatch(fetchTransactions())
            setEditId("")
            setIsEditMode(false)
        }else{
            if (!amount || !description) return alert("All fields are required!");
            dispatch(addTransaction({ amount, description}));
            setAmount("");
            setDescription("");
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">{id ? "Edit Transaction" : "Add Transaction"}</button>
    </form>
  );
};

export default TransactionForm;
