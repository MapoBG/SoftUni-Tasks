export const openUserWindowHandler = (setFunction) => {
    setFunction(oldState => true);
};

export const closeUserWindowHandler = (setFunction) => {
    setFunction(oldState => false);
};