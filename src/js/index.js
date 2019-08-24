import 'bootstrap';

require.context('../../node_modules/@fortawesome/fontawesome-free/webfonts', true, /\.(ttf|woff|woff2|eot)$/);
import '../scss/stirparty.scss';

require("../CNAME.in");
require.context('..', true, /\.(html)$/i);
require.context('../images', true, /\.(png|gif|jpg)$/);
require.context('../videos', true, /\.(mp4)$/);