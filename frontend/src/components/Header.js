import React from "react";

export default function Header() {
        return(

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <span class="navbar-brand mb-0 h1">OffDemand</span>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/">Course</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/">Livestream</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/">OffMessage</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/">Account</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/">Help Center</a>
                            </li>

                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active"  href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active"  href="/register">register</a>
                        </li>
                        </ul>
                        </div>
                    </div>
                </nav>

        );
    

}