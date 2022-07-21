import { motion } from 'framer-motion';


function Button(props) {
    const {
        children,
        className = '',
        type = 'button',
        title,
        handleClick,
    } = props;

    return (
        <motion.button
            className={`Button ${className}`}
            type={type}
            title={title}
            onClick={handleClick}
        >
            {children}
        </motion.button>
    );
}

export default Button;
