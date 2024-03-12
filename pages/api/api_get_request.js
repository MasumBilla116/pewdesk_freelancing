export default async function handler(req, res) {

    console.log(`get:req:token= ${req.body.access_token}`);
    console.log(`get:req:endpoint= ${process.env.NEXT_API_URL}${req.body.endpoint}`);

    const reqBody = req.body;
    let headerOptions = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${reqBody.access_token}`,
        'CHANNEL-ID': `${reqBody.channel_id}`,
        'ACCESS-KEY': `${reqBody.access_key}`,
        'SECRET-KEY': `${reqBody.secret_key}`,
    };

    const response = await fetch(
        `${process.env.NEXT_API_URL}${req.body.endpoint}`,
        {
            method: 'GET',
            headers: headerOptions,
            withCredentials: true,
        },
    )
    const resData = await response.json()
    res.status(200).json(resData)
}
