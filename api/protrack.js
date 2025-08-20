import MD5 from "crypto-js/md5";

export default async function handler(req, res) {
  try {
    const getUnixTimestamp = () => Math.floor(Date.now() / 1000);

    const generateSignature = (password, timestamp) => {
      const firstHash = MD5(password).toString();
      return MD5(firstHash + timestamp).toString();
    };

    const password = "Ravan@tracker1";
    const timestamp = getUnixTimestamp();
    const signature = generateSignature(password, timestamp);

    const response = await fetch(
      `https://api.protrack365.com/api/authorization?time=${timestamp}&account=TProject1&signature=${signature}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch Protrack API",
        status: response.status,
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
