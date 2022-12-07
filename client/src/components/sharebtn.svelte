<script>
  (function() {
getElementByClassName('.share').on('click', function(e) {
  e.preventDefault();
  var $this = $(this);
  $this.animate({
    'width': $this.width() == 304 ? '64px' : '304px'
  }, 300, 'swing');
});
} () );
</script>

<div class="container">
  <ul class="btn-share clearfix">
    <li>
      <a href="#" class="button share entypo-share" rel="noreferrer" />
    </li>
    <li>
      <a href="https://twitter.com/" class="button twitter entypo-twitter" target="_blank" rel="noreferrer" />
    </li>
    <li>
      <a href="https://www.facebook.com/share.php?u=" class="button facebook entypo-facebook" target="_blank" rel="noreferrer" />
    </li>
    <li>
      <a href="https://plus.google.com/" class="button google entypo-gplus" target="_blank" rel="noreferrer" />
    </li>
  </ul>
</div>

<style>
  a[class*='entypo-']:before,
  span[class*='entypo-']:before {
    font-family: 'entypo', sans-serif;
  }

  /* body {
    background: #f9f9f9;
    color: #151515;
    font: 100%/1.5em sans-serif;
    margin: 0;
  } */

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .clearfix {
    *zoom: 1;
  }
  .clearfix:before,
  .clearfix:after {
    content: '';
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  .container {
    height: 64px;
    left: 50%;
    margin: -32px 0 0 -152px;
    position: absolute;
    top: 50%;
    width: 304px;
  }

  /* ---------- SHARE-BUTTON ---------- */

  .button {
    border-radius: 8px;
    color: #fff;
    display: block;
    font-size: 24px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    -webkit-transition: -webkit-transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -ms-transition: -ms-transform 0.2s;
    -o-transition: -o-transform 0.2s;
    transition: all 0.2s;
    -webkit-transform: translateZ(1);
    width: 64px;
  }

  .button:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }

  .share {
    background: #444;
    box-shadow: 0 4px 0 #2a2a2a;
    width: 304px;
  }

  .twitter {
    background: #00acee;
    box-shadow: 0 4px 0 #0080b1;
  }

  .facebook {
    background: #3b5998;
    box-shadow: 0 4px 0 #2d4370;
  }

  .google {
    background: #cc3732;
    box-shadow: 0 4px 0 #9c2a26;
  }

  .btn-share {
    display: inline-block;
    position: relative;
  }

  .btn-share li {
    float: left;
    margin: 0 8px;
  }

  .btn-share li:first-child {
    margin-left: 0;
    position: absolute;
  }

  .btn-share li:nth-child(2) {
    margin: 0 8px 0 80px;
  }

  .btn-share li:last-child {
    margin: 0 0 0 8px;
  }
</style>
