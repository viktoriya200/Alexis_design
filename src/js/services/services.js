const postDate = async (url, date) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: date
    });
    return await res.json();
};