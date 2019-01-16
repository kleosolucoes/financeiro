export function formatReal( int ){
	var tmp = int+'';
	tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
	if( tmp.length > 6 )
		tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

	return tmp;
}

export function getMoney( str ){
	return parseInt( str.replace(/[\D]+/g,'') );
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
