exports.getDate = () => {
    const today = new Date();
    const currentDay = today.getDay();

    //format day
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString("en-US", options);

    return day;
}

