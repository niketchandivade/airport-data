import "../styles/Button.css";

const Button = (props) => {

    const { children, onClick, type } = props;

    return (
        <button className="btn" type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;