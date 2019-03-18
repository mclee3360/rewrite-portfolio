// ID of Google Sheet pulling data from.
var data_id = "1WiTu_F7060zf2G3QvZswbAqAFnwM7oAmrp4v3_dywbg";
// URL of sheet data in JSON format.
var json_url = "https://spreadsheets.google.com/feeds/list/" + data_id + "/default/public/values?alt=json";

// AJAX request to retrieve Google Sheet data.
$.ajax({
    url: json_url,
    dataType: 'json',
    success: function(data)
    {
        var entries = [];
        data.feed.entry.forEach(element => entries.push(extractData(element)));
    },
    error: function(data)
    {
        console.log("ERROR: " + data);
    }
});

/**
 * Converts the JSON data into a clean object.
 *
 * @param entry  the entry to convert from the JSON.
 * @return a cleaner object representation.
 */
function extractData(entry)
{
    return data =
    {
        date: entry.gsx$date.$t,
        role: entry.gsx$role.$t,
        series: entry.gsx$series.$t,
        url: entry.gsx$url.$t
    }
}
