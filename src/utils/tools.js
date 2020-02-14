//百度坐标转高德（传入经度、纬度）
export function bd_decrypt(bd_lng, bd_lat) {
  var X_PI = (Math.PI * 3000.0) / 180.0;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  var array = [];
  array.push(gg_lng);
  array.push(gg_lat);
  // console.log(array);
  return array;
  // return {lng: gg_lng, lat: gg_lat}
}
//高德坐标转百度（传入经度、纬度）
export function bd_encrypt(gg_lng, gg_lat) {
  let array = [];
  var X_PI = (Math.PI * 3000.0) / 180.0;
  var x = gg_lng,
    y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  array.push(bd_lng);
  array.push(bd_lat);
  // return {
  //  bd_lat: bd_lat,
  //  bd_lng: bd_lng
  //};
  return array;
}
