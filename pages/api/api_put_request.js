export default async function handler(req, res) {

    console.log(`post:req:token= ${req.body.access_token}`);
    console.log(`post:req:endpoint= ${process.env.NEXT_API_URL}${req.body.endpoint}`);

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
            method: 'PUT',
            headers: headerOptions,
            withCredentials: true,
            body: JSON.stringify(req.body.data),
        },
    )
    const resData = await response.json()
    res.status(200).json(resData)
}
