const fs = require( 'node:fs' );
const path = require( 'node:path' );

const version = process.argv[ 2 ];
const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

if ( ! version || ! versionPattern.test( version ) ) {
	console.error( 'Usage: node scripts/version-bump.js <major.minor.patch>' );
	process.exit( 1 );
}

const root = path.resolve( __dirname, '..' );

function replaceFirstVersion( relativePath ) {
	const filePath = path.join( root, relativePath );
	const source = fs.readFileSync( filePath, 'utf8' );
	const versionField = source.match( /("version"\s*:\s*")[^"]+(")/ );
	if ( ! versionField ) {
		throw new Error( `Could not find a version field in ${ relativePath }.` );
	}
	const updated = source.replace( versionField[ 0 ], `${ versionField[ 1 ] }${ version }${ versionField[ 2 ] }` );
	fs.writeFileSync( filePath, updated );
}

function replacePackageLockVersions() {
	const filePath = path.join( root, 'package-lock.json' );
	const source = fs.readFileSync( filePath, 'utf8' );
	let replacements = 0;
	const updated = source.replace( /(\"version\"\s*:\s*\")[^\"]+(\")/g, ( match, prefix, suffix ) => {
		if ( replacements < 2 ) {
			replacements += 1;
			return `${ prefix }${ version }${ suffix }`;
		}
		return match;
	} );
	if ( replacements !== 2 ) {
		throw new Error( 'Could not find both root package versions in package-lock.json.' );
	}
	fs.writeFileSync( filePath, updated );
}

replaceFirstVersion( 'package.json' );
replacePackageLockVersions();
replaceFirstVersion( 'src/block.json' );

const pluginPath = path.join( root, 'wpwing-sticky-block.php' );
const plugin = fs.readFileSync( pluginPath, 'utf8' ).replace(
	/^( \* Version:\s+)[^\n]+$/m,
	`$1${ version }`
);
fs.writeFileSync( pluginPath, plugin );

const readmePath = path.join( root, 'readme.txt' );
const readme = fs.readFileSync( readmePath, 'utf8' ).replace(
	/^(Stable tag:\s+)[^\n]+$/m,
	`$1${ version }`
);
fs.writeFileSync( readmePath, readme );

console.log( `Version bumped to ${ version }.` );
