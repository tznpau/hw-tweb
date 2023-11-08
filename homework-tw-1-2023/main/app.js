const compress = (a, b = true) => {	
	if (typeof a !== 'string' && !(a instanceof String)) {
		throw new Error('InvalidType');
	}
	// if (a === '')
	// 	return a;

	if (b) {
		let compressedResult = '';
		let k = 1; 

		for (let i = 0; i < a.length; i++) {
			if (a[i] === a[i + 1]) {
				k++;
			}
			else {
				compressedResult += a[i] + k;
				k = 1;	
			}
		}
		return compressedResult;
	} else {
		let decompressedResult = '';
		let i = 0;
		while (i < a.length) {
			const char = a[i];
			let nr = '';
			i++;

			while (i < a.length && !isNaN(parseInt(a[i]))) {
				nr += a[i];
				i++;
			}
			nr = nr ? parseInt(nr) : 1;
			decompressedResult += char.repeat(nr);
		}
		return decompressedResult;
	}
}

module.exports = compress