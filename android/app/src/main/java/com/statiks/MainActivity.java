package com.statiks;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.ImageView;
import android.view.Gravity;
import android.util.TypedValue;
import android.support.v4.content.ContextCompat;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        ImageView imageView = new ImageView(this);

        view.setBackgroundColor(Color.parseColor("#f0f6fa"));
        view.setGravity(Gravity.CENTER);

        // hard code the width and the height of the logo
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(432, 340);
        layoutParams.gravity = Gravity.CENTER;
        imageView.setLayoutParams(layoutParams);
        imageView.setImageDrawable(ContextCompat.getDrawable(this.getApplicationContext(), R.drawable.logo_file));

        view.addView(imageView);
        return view;
    }
}
