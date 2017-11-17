let typeF = (t) => {
	return ((d) => {
		return d.element_type === t;
	});
}
let timeCmp = (a,b) => {
	return -a.minutes + b.minutes;
}
let pointCmp = (a,b) => {
	return -parseFloat(a[pMap.ppg]) + parseFloat(b[pMap.ppg]);
}
