import { useState } from "react";
let initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [open, setOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpen() {
    setOpen(!open);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setOpen(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setOpen(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        <FormAddFriend
          open={open}
          onAddFriend={handleAddFriend}
          onOpen={handleOpen}
        />
        <Button onClick={handleOpen}>
          {open === false ? "Add friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill
        selectedFriend={selectedFriend}
        onSplitBill={handleSplitBill}
      />
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  //console.log(isSelected);
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="friend-avatar"></img>
      <div>
        <h3>{friend.name}</h3>
        <p
          className={
            friend.balance < 0 ? "red" : friend.balance > 0 ? "green" : ""
          }
        >
          {friend.balance < 0
            ? `You owe ${friend.name} ${Math.abs(friend.balance)}€`
            : friend.balance > 0
            ? `${friend.name} owe you ${friend.balance}€`
            : `You and ${friend.name} are equal`}
        </p>
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ open, onAddFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleImgUrl(e) {
    setImgUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !imgUrl) return;
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${imgUrl}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImgUrl("https://i.pravatar.cc/48");
  }

  return open ? (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend name </label>
      <input type="text" onChange={handleName} value={name}></input>

      <label>🌆 Image URL</label>
      <input type="text" onChange={handleImgUrl} value={imgUrl}></input>

      <Button>Add</Button>
    </form>
  ) : null;
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpenses, setUserExpenses] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleBill(e) {
    setBill(Number(e.target.value));
  }

  function handleWhoIsPaying(e) {
    setWhoIsPaying(e.target.value);
  }

  const friendExpenses = bill ? bill - userExpenses : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpenses) return;

    onSplitBill(whoIsPaying === "user" ? friendExpenses : -userExpenses);
  }

  return selectedFriend ? (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name} </h2>
      <label> 💰 Bill Value </label>
      <input type="text" onChange={handleBill} value={bill}></input>

      <label> 💸 Your expense </label>
      <input
        type="text"
        onChange={(e) =>
          setUserExpenses(
            Number(e.target.value) > bill
              ? userExpenses
              : Number(e.target.value)
          )
        }
        value={userExpenses}
      ></input>

      <label> 👭 {selectedFriend.name}'s Expense </label>
      <input type="text" disabled value={friendExpenses}></input>

      <label> 🤑 Who is paying the bill? </label>
      <select onChange={handleWhoIsPaying}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  ) : null;
}
