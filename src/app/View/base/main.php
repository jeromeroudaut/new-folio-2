<!doctype html>
<html lang="en">
    <head itemscope>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <!-- <link rel="canonical" href="<?= $this->head['url']; ?>"> -->
        <!-- Robots -->
        <meta name="robots" content="<?= $this->head['robots']; ?>">
        <!-- Device -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="pragma" content="no-cache" />
        <!-- SEO -->
        <title><?= $this->head['title']; ?></title>
        <meta name="description" content="<?= $this->head['description']; ?>">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="<?= $this->head['twitter']['pseudo']; ?>">
        <meta name="twitter:title" content="<?= $this->head['title']; ?>">
        <meta name="twitter:description" content="<?= $this->head['description']; ?>">
        <meta name="twitter:image" content="<?= $this->head['opengraph']; ?>">
        <meta name="twitter:creator" content="<?= $this->head['twitter']['creator']; ?>">
        <!-- Google+ -->
        <meta itemprop="name" content="<?= $this->head['title']; ?>">
        <meta itemprop="description" content="<?= $this->head['description']; ?>">
        <meta itemprop="image" content="<?= $this->head['opengraph']; ?>">
        <!-- Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="<?= $this->head['url']; ?>">
        <meta property="og:title" content="<?= $this->head['title']; ?>">
        <meta property="og:description" content="<?= $this->head['description']; ?>">
        <meta property="og:image" content="<?= $this->head['opengraph']; ?>">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <!-- Favicon -->
        <!-- Link mask icon no compatible W3C → safari svg -->
        <link rel="apple-touch-icon" sizes="180x180" href="/static/media/fav/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/media/fav/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/media/fav/favicon-16x16.png">
        <link rel="manifest" href="/static/media/fav/manifest.json">
        <link rel="shortcut icon" href="/static/media/fav/favicon.ico">
        <meta name="msapplication-config" content="/static/media/fav/browserconfig.xml">
        <meta name="theme-color" content="#000">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
        <!-- Style -->
        <!-- CSS after Typekit is better -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">
        <link rel="stylesheet" href="./static/style/css/app.css">
        <style>
        @font-face {
            font-family: "FuturaStd-ExtraBold";
            src: url("./static/media/sou/FuturaStd-ExtraBold.otf");
        }
        @font-face {
            font-family: "FuturaStdBold";
            src: url("./static/media/sou/FuturaStdBold.otf");
        }
        @font-face {
            font-family: "MarkPro-Black";
            src: url("./static/media/sou/MarkPro-Black.otf");
        }
        @font-face {
            font-family: "MarkPro";
            src: url("./static/media/sou/MarkPro.otf");
        }
        @font-face {
            font-family: "circular-book";
            src: url("./static/media/sou/circular-book.otf");
        }
        @font-face {
            font-family: "AvenirNext-Bold";
            src: url("./static/media/sou/AvenirNext-Bold.otf");
        }
        @font-face {
            font-family: "Flama";
            src: url("./static/media/sou/Flama.otf");
        }
        </style>
        <!-- <link rel="preload" href="./static/style/css/app.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="path/to/mystylesheet.css"></noscript> -->
    </head>
    <body>
    <div class="container" id="home">
        <div id="body-content-wrapper">
        <?php include ROOT . 'app/View/common/sail.php'; ?>
        <div id="app">
        <?php include ROOT . 'app/View/common/burger.php'; ?>
        <div id="xhr">
            <?= $this->content; ?>
        </div>
        </div>
        <?php include ROOT . 'app/View/common/loader.php'; ?>
        <?php include ROOT . 'app/View/common/svg.php'; ?>
        <?php include ROOT . 'app/View/issue/browserWidth.php'; ?>
        <?php include ROOT . 'app/View/issue/updateBrowser.php'; ?>
        <?php include ROOT . 'app/View/issue/enableJavascript.php'; ?>
        </div>
    </div>
        <!-- Script -->
        <script src="static/js/three.min.js"></script>
        <script src="static/js/OrbitControls.js"></script>
        <script src="static/js/TweenLite.min.js"></script>
        <script src="static/js/stats.min.js"></script>
        <script src="static/js/ImprovedNoise.js"></script>
        <script type="text/javascript" src="static/js/lib/seriously/seriously.js"></script>
		<script type="text/javascript" src="static/js/lib/seriously/effects/seriously.tvglitch.js"></script>
        <script type="text/javascript" src="static/js/demo3.js"></script>
        <script type="text/javascript" src="static/js/app.js"></script>
        <!-- Google Analytics -->
        <!-- <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'XX-XXXXXXXX-X', 'auto');ga('send', 'pageview');</script> -->
    </body>
</html>