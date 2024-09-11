const initialFriends = [
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

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <Button>Add Friend</Button>
        <FormAddFriend />
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👭 Friend name </label>
      <input type="text"></input>

      <label>🌆 Image URL</label>
      <input type="text"></input>

      <Button>Add</Button>
    </form>
  );
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
