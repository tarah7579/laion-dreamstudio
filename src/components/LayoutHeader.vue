<template>
    <div id="kt_header" class="header align-items-stretch" >
        <div class="container-fluid d-flex align-items-stretch justify-content-between">
            <div class="align-items-center mobile-menu-icon d-lg-none ms-n3 me-1" title="Show aside menu">
                <div class="btn btn-icon" id="kt_aside_mobile_toggle">
                    <span class="svg-icon svg-icon-1 rotate-180">
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" opacity="0.5" d="M9.63433 11.4343L5.45001 7.25C5.0358 6.83579 5.0358 6.16421 5.45001 5.75C5.86423 5.33579 6.5358 5.33579 6.95001 5.75L12.4929 11.2929C12.8834 11.6834 12.8834 12.3166 12.4929 12.7071L6.95001 18.25C6.5358 18.6642 5.86423 18.6642 5.45001 18.25C5.0358 17.8358 5.0358 17.1642 5.45001 16.75L9.63433 12.5657C9.94675 12.2533 9.94675 11.7467 9.63433 11.4343Z" fill="black"></path>
                            <path xmlns="http://www.w3.org/2000/svg" d="M15.6343 11.4343L11.45 7.25C11.0358 6.83579 11.0358 6.16421 11.45 5.75C11.8642 5.33579 12.5358 5.33579 12.95 5.75L18.4929 11.2929C18.8834 11.6834 18.8834 12.3166 18.4929 12.7071L12.95 18.25C12.5358 18.6642 11.8642 18.6642 11.45 18.25C11.0358 17.8358 11.0358 17.1642 11.45 16.75L15.6343 12.5657C15.9467 12.2533 15.9467 11.7467 15.6343 11.4343Z" fill="black"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                <a href="/dream" class="d-lg-none">
                    <img alt="Logo" src="/media/logo.png" class="h-50px">
                </a>
            </div>
            <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                <div class="d-flex align-items-stretch" id="kt_header_menu_nav">
                    <div class="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-place="true" data-kt-place-mode="prepend" data-kt-place-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
                        <div class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
                            <div class="menu-item me-lg-1" style="margin-right: 15px !important;">
                                <a aria-current="page" href="/dream" class="active router-link-exact-active menu-link">
                                    <span class="menu-title">OpenDream</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="d-flex align-items-stretch flex-shrink-0">
                    <div class="d-flex align-items-stretch flex-shrink-0">
                        <div class="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                            <span class="symbol symbol-30px symbol-md-40px el-tooltip__trigger el-tooltip__trigger">
                                <img src="" alt=" " class="rounded-circle img-fluid profile-picture cursor-pointer">
                            </span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
