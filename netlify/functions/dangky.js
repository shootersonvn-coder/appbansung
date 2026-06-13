exports.handler = async function(event) {
  try {
    const qs = event.rawQuery || "action=init";
    const url =
      "https://script.google.com/macros/s/AKfycbyOb8Ohz8eU70DbEyACAK-TlqHOD_GYWyTUyuGreJVR_EN6QdtAKok3JQIN0hrqJ65SPg/exec?" + qs;

    const res = await fetch(url);
    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ success:false, error:String(err.message || err) })
    };
  }
};