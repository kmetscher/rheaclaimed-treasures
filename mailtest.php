<?php 
if (!mail('kscott.mets@gmail.com', 'howdy', 'this is a test')) {
    print_r(error_get_last());
}
?>