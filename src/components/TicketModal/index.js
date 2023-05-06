import { Modal } from "@mui/base";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const TicketModal = ({ groupData, handleAddToCart, open }) => {
  const classes = useStyles();

  return (
    <Modal open={open}>
      <div className={classes.paper}>
        <h2>Select a Group</h2>
        {newGroupData.map((group) => (
          <div key={group.id}>
            <h3>{group.name}</h3>
            {group.children.map((child) => (
              <div key={child.visitor_id}>
                <input
                  type="radio"
                  name="groupSelect"
                  id={child.visitor_id}
                  value={child.visitor_id}
                  onChange={() => handleGroupSelect(child)}
                />
                <label htmlFor={child.visitor_id}>{child.name}</label>
              </div>
            ))}
            {selectedGroup && (
              <div className={classes.quantity}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        ))}
        {selectedGroup && (
          <div>
            <p>Total: ${selectedGroup.ticket_price * quantity}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCartClick}
              className={classes.button}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TicketModal;