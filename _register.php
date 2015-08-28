<div>
    <h2 class="large-offset-1">Registration:</h2>
    <div class="large-offset-1 large-6">
    <form action="inner/inner_register.php" method="post" enctype="multipart/form-data">
        <div>
<!--            <label class="label" for="user_name">Name</label>-->
            <input type="text" name="user[name]" id="user_name" placeholder="Full Name"/>
        </div>
        <div>
<!--            <label class="label" for="user_roll">Roll</label>-->
            <input type="text" name="user[roll]" id="user_roll" placeholder="University Roll"/>
        </div>
        <div>
            <!--            <label class="label" for="user_graduation_year">Graduation Year</label>-->
            <input type="text" name="user[graduation_year]" id="user_graduation_year" placeholder="Graduation Year"/>
        </div>
        <div>
            <!--            <label class="label" for="user_email">Email</label>-->
            <input type="text" name="user[email]" id="user_email" placeholder="Email Address"/>
        </div>
        <div>
            <!--            <label class="label" for="user_email">Email</label>-->
            <input type="text" name="user[phone]" id="user_phone" placeholder="Phone Number"/>
        </div>
        <div>
<!--            <label class="label" for="user_password">Password</label>-->
            <input type="password" name="user[password]" id="user_password" placeholder="Password"/>
        </div>
        <div>
<!--            <label class="label" for="user_confirm_password">Confirm Password</label>-->
            <input type="password" name="user[confirm_password]" id="user_confirm_password" placeholder="Confirm Password"/>
        </div>
        <div>
<!--            <label class="label" for="user_current_profession">Current Profession</label>-->
            <input type="text" name="user[current_profession]" id="user_current_profession" placeholder="Current Profession"/>
        </div>
        <div>
<!--            <label class="label" for="user_organization">Institution/Organization</label>-->
            <input type="text" name="user[current_organization]" id="user_organization" placeholder="Institution/Organization"/>
        </div>
        <div>
            <label class="label" for="user_photo">Your Photo</label>
            <input type="file" name="user_photo" id="user_photo"/>
        </div>
        <div>
            <input type="submit" name="register" id="register_button" class="button" value="Register"/>
        </div>
    </form>
    </div>
</div>
