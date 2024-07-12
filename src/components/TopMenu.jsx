import { Navigate } from 'react-router-dom';
import { twilioAuth } from '../services/auth';

export default function TopMenu({ children }) {
    if (!twilioAuth.isAuthenticated) {
        return <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="xxnavbar-toggler" type="button" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <a class="nav-link active" aria-current="page" href="/login">Signup/Login</a>
                    </button>
                </div>
            </nav>
        </>
    } else {
        return <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="xxnavbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <a class="nav-link active" aria-current="page" href="/laundryservice">Schedule a Caddie</a>
                    </button>
                </div>
            </nav>
        </>
    }

    return children;
}