<?php

// Vercel's PHP runtime requires the entry point to live under api/.
// __DIR__ inside the required file still resolves to public/, so
// Laravel's own bootstrap paths work unchanged.
require __DIR__ . '/../public/index.php';
