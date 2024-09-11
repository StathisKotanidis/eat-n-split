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

  function handleOpen() {
    setOpen(!open);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        <FormAddFriend
          open={open}
          onAddFriend={handleAddFriend}
          onOpen={handleOpen}
        />
        <Button onClick={handleOpen}>
          {open === false ? "Add friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH CLARK </h2>
      <label> 💰 Bill Value </label>
      <input type="text"></input>

      <label> 💸 Your expense </label>
      <input type="text"></input>

      <label> 👭 Clark's Expense </label>
      <input type="text" disabled></input>

      <label> 🤑 Who is paying the bill? </label>
      <select>
        <option value="user">You</option>
        <option value="friend">Clark</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
