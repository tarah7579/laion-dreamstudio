<template>
    <div id="kt_aside" class="aside aside-dark" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'100%', 'lg': '200px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle" data-kt-drawer-close="#kt_aside_mobile_close" >
        <span id="kt_aside_mobile_close" class="close">
            <i class="bi bi-x-circle"></i>
        </span>
        <div class="aside-logo flex-column-auto" id="kt_aside_logo">
            <router-link to="/" class="router-link-active router-link-exact-active" aria-current="page">
                <img alt="Logo" src="/media/logo.png" class="logo">
            </router-link>
        </div>
        <div class="aside-menu">
            <div>
                <div class="active-case" style="background:rgb(14, 14, 14);text-align:center;padding:23px 0px 20px;">
                    <div class="row">
                        <div class="col-12" style="line-height:42px;margin-top:15px;color:#fff;font-size:10px;">
                            <div style="line-height:16px;">
                                <b>LAION OpenDream</b><br>
                                <i style="font-size:10px;">beta</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="kt_aside_menu_wrapper" class="hover-scroll-overlay-y" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-height="auto" data-kt-scroll-offset="0" data-kt-scroll-wrappers="#kt_aside_menu" style="height: 904px;">
            <div id="#kt_header_menu" class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" data-kt-menu="true">
                <div id="aside-context">
                    <div class="menu-item menu-accordion" data-kt-menu-sub="accordion" data-kt-menu-trigger="click"  >
                        <div class="menu-content pt-8 pb-2" >
                            <span class="menu-section text-muted text-uppercase fs-8 ls-1" >MENU</span>
                        </div>
                        <router-link to="/dream" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-moon-stars fs-2x" ></i>
                                </span>
                                <span class="menu-title" >Dream</span>
                            </span>
                        </router-link>
                        <router-link to="/annotate" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-pencil-square fs-2x" ></i>
                                </span>
                                <span class="menu-title" >Annotate</span>
                            </span>
                        </router-link>
                        <router-link to="/history" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-images fs-2x" ></i>
                                </span>
                                <span class="menu-title" >History</span>
                            </span>
                        </router-link>
                        <router-link to="/prompt-guide" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-chat-left-quote fs-2x" ></i>
                                </span>
                                <span class="menu-title" >Prompt Guide</span>
                            </span>
                        </router-link>
                        <router-link to="/social" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-people fs-2x" ></i>
                                </span>
                                <span class="menu-title" >Social</span>
                            </span>
                        </router-link>
                        <router-link to="/faq" class="" >
                            <span class="menu-link" >
                                <span class="menu-icon" >
                                    <i class="bi bi-question-circle fs-2x" ></i>
                                </span>
                                <span class="menu-title" >FAQ</span>
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
