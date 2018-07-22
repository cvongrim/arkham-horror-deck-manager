package com.ahdm;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public int getSplashLayout() {
        return R.layout.launch_screen;
    }
}
